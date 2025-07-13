// hooks/useInterview.ts
import { useState, useEffect, useCallback } from 'react';
import { apiService, Interview, Question, Answer, InterviewSummary } from '@/lib/api';

export interface InterviewState {
  interview: Interview | null;
  currentQuestion: Question | null;
  currentQuestionIndex: number;
  answers: Answer[];
  isLoading: boolean;
  error: string | null;
  voiceCallId: string | null;
  callStatus: 'idle' | 'connecting' | 'in-progress' | 'completed' | 'failed';
}

export const useInterview = () => {
  const [state, setState] = useState<InterviewState>({
    interview: null,
    currentQuestion: null,
    currentQuestionIndex: 0,
    answers: [],
    isLoading: false,
    error: null,
    voiceCallId: null,
    callStatus: 'idle',
  });

  // Start a new interview
  const startInterview = useCallback(async (interviewData: {
    interviewType: string;
    role: string;
    techStack: string;
    duration: string;
    profilePicture?: File;
  }) => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      const interview = await apiService.startInterview(interviewData);
      
      setState(prev => ({
        ...prev,
        interview,
        currentQuestion: interview.questions[0] || null,
        currentQuestionIndex: 0,
        isLoading: false,
      }));
      
      return interview;
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Failed to start interview',
        isLoading: false,
      }));
      throw error;
    }
  }, []);

  // Start voice interview
  const startVoiceInterview = useCallback(async (interviewId: string) => {
    if (!interviewId) return;
    
    setState(prev => ({ ...prev, callStatus: 'connecting' }));
    
    try {
      const voiceCall = await apiService.startVoiceInterview({ interviewId });
      // Assuming the expected type has an 'id' property
      const typedVoiceCall = voiceCall as { id: string };

      setState(prev => ({
        ...prev,
        voiceCallId: typedVoiceCall.id,
        callStatus: 'in-progress',
      }));
      
      return typedVoiceCall;
    } catch (error) {
      setState(prev => ({
        ...prev,
        callStatus: 'failed',
        error: error instanceof Error ? error.message : 'Failed to start voice interview',
      }));
      throw error;
    }
  }, []);

  // Submit answer
  const submitAnswer = useCallback(async (answerData: {
    questionId: string;
    answer: string;
    audioData?: Blob;
  }) => {
    if (!state.interview) return;
    
    setState(prev => ({ ...prev, isLoading: true }));
    
    try {
      const response = await apiService.submitAnswer({
        interviewId: state.interview.id,
        ...answerData,
      });
      
      setState(prev => ({
        ...prev,
        answers: [...prev.answers, response.answer],
        isLoading: false,
      }));
      
      return response;
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Failed to submit answer',
        isLoading: false,
      }));
      throw error;
    }
  }, [state.interview]);

  // Move to next question
  const nextQuestion = useCallback(() => {
    if (!state.interview || !state.interview.questions) return false;
    
    const nextIndex = state.currentQuestionIndex + 1;
    const hasNext = nextIndex < state.interview.questions.length;
    
    if (hasNext) {
      setState(prev => ({
        ...prev,
        currentQuestionIndex: nextIndex,
        currentQuestion: state.interview!.questions[nextIndex],
      }));
    }
    
    return hasNext;
  }, [state.interview, state.currentQuestionIndex]);

  // Move to previous question
  const previousQuestion = useCallback(() => {
    if (!state.interview || !state.interview.questions) return false;
    
    const prevIndex = state.currentQuestionIndex - 1;
    const hasPrev = prevIndex >= 0;
    
    if (hasPrev) {
      setState(prev => ({
        ...prev,
        currentQuestionIndex: prevIndex,
        currentQuestion: state.interview!.questions[prevIndex],
      }));
    }
    
    return hasPrev;
  }, [state.interview, state.currentQuestionIndex]);

  // Complete interview
  const completeInterview = useCallback(async () => {
    if (!state.interview) return;
    
    setState(prev => ({ ...prev, isLoading: true }));
    
    try {
      const summary = await apiService.completeInterview(state.interview.id);
      
      setState(prev => ({
        ...prev,
        interview: prev.interview ? { ...prev.interview, summary: summary as InterviewSummary } : null,
        callStatus: 'completed',
        isLoading: false,
      }));
      
      return summary;
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Failed to complete interview',
        isLoading: false,
      }));
      throw error;
    }
  }, [state.interview]);

  // Get interview by ID
  const getInterview = useCallback(async (interviewId: string) => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      const interview = await apiService.getInterview(interviewId) as Interview;
      
      setState(prev => ({
        ...prev,
        interview,
        currentQuestion: interview.questions[0] || null,
        currentQuestionIndex: 0,
        answers: interview.answers || [],
        isLoading: false,
      }));
      
      return interview;
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Failed to load interview',
        isLoading: false,
      }));
      throw error;
    }
  }, []);

  // Check voice call status
  const checkCallStatus = useCallback(async (callId: string) => {
    try {
      const status = await apiService.getCallStatus(callId);
      if (typeof status === 'object' && status !== null && 'status' in status) {
        setState(prev => ({ ...prev, callStatus: (status as { status: InterviewState['callStatus'] }).status }));
      }
      return status;
    } catch (error) {
      console.error('Failed to check call status:', error);
    }
  }, []);

  // Poll call status
  useEffect(() => {
    if (!state.voiceCallId || state.callStatus === 'completed' || state.callStatus === 'failed') {
      return;
    }
    
    const interval = setInterval(() => {
      checkCallStatus(state.voiceCallId!);
    }, 5000); // Check every 5 seconds
    
    return () => clearInterval(interval);
  }, [state.voiceCallId, state.callStatus, checkCallStatus]);

  // Clear error
  const clearError = useCallback(() => {
    setState(prev => ({ ...prev, error: null }));
  }, []);

  // Reset interview state
  const resetInterview = useCallback(() => {
    setState({
      interview: null,
      currentQuestion: null,
      currentQuestionIndex: 0,
      answers: [],
      isLoading: false,
      error: null,
      voiceCallId: null,
      callStatus: 'idle',
    });
  }, []);

  // Helper computed values
  const isLastQuestion = state.interview 
    ? state.currentQuestionIndex === state.interview.questions.length - 1
    : false;
  
  const isFirstQuestion = state.currentQuestionIndex === 0;
  
  const progress = state.interview 
    ? ((state.currentQuestionIndex + 1) / state.interview.questions.length) * 100
    : 0;

  return {
    // State
    ...state,
    
    // Computed values
    isLastQuestion,
    isFirstQuestion,
    progress,
    
    // Actions
    startInterview,
    startVoiceInterview,
    submitAnswer,
    nextQuestion,
    previousQuestion,
    completeInterview,
    getInterview,
    checkCallStatus,
    clearError,
    resetInterview,
  };
};