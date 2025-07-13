// lib/api.ts
import { getAuth } from 'firebase/auth';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

class ApiService {
  private async getAuthToken(): Promise<string | null> {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      return await user.getIdToken();
    }
    return null;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const token = await this.getAuthToken();
    
    const config: RequestInit = {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
    };

    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    
    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Network error' }));
      throw new Error(error.message || `HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  // Interview API Methods
  async startInterview(interviewData: {
    interviewType: string;
    role: string;
    techStack: string;
    duration: string;
    profilePicture?: File;
  }) {
    const formData = new FormData();
    formData.append('interviewType', interviewData.interviewType);
    formData.append('role', interviewData.role);
    formData.append('techStack', interviewData.techStack);
    formData.append('duration', interviewData.duration);
    
    if (interviewData.profilePicture) {
      formData.append('profilePicture', interviewData.profilePicture);
    }

    const token = await this.getAuthToken();
    const response = await fetch(`${API_BASE_URL}/interviews/start`, {
      method: 'POST',
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Network error' }));
      throw new Error(error.message || `HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  async submitAnswer(data: {
    interviewId: string;
    questionId: string;
    answer: string;
    audioData?: Blob;
  }) {
    const formData = new FormData();
    formData.append('interviewId', data.interviewId);
    formData.append('questionId', data.questionId);
    formData.append('answer', data.answer);
    
    if (data.audioData) {
      formData.append('audioData', data.audioData, 'answer.wav');
    }

    const response = await fetch(`${API_BASE_URL}/interviews/submit`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Network error' }));
      throw new Error(error.message || `HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  async completeInterview(interviewId: string) {
    return this.request(`/interviews/${interviewId}/complete`, {
      method: 'POST',
    });
  }

  async getInterview(interviewId: string) {
    return this.request(`/interviews/${interviewId}`);
  }

  async getUserInterviews() {
    return this.request('/interviews');
  }

  async deleteInterview(interviewId: string) {
    return this.request(`/interviews/${interviewId}`, {
      method: 'DELETE',
    });
  }

  async generatePracticeQuestions(data: {
    role: string;
    techStack: string;
    difficulty: string;
  }) {
    return this.request('/interviews/practice-questions', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Voice Interview API Methods (Vapi)
  async startVoiceInterview(interviewData: {
    interviewId: string;
    assistantId?: string;
  }) {
    return this.request('/vapi/start-voice', {
      method: 'POST',
      body: JSON.stringify(interviewData),
    });
  }

  async getCallStatus(callId: string) {
    return this.request(`/vapi/call/${callId}/status`);
  }

  // User API Methods
  async createUser(userData: {
    name: string;
    email: string;
    profilePicture?: string;
  }) {
    return this.request('/users', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async getUser() {
    return this.request('/users/profile');
  }

  async updateUser(userData: {
    name?: string;
    profilePicture?: string;
  }) {
    return this.request('/users/profile', {
      method: 'PUT',
      body: JSON.stringify(userData),
    });
  }

  async getUserCredits() {
    return this.request('/users/credits');
  }
}

// Export singleton instance
export const apiService = new ApiService();

// Types for better TypeScript support
export interface Interview {
  id: string;
  userId: string;
  interviewType: string;
  role: string;
  techStack: string;
  duration: string;
  status: 'active' | 'completed' | 'cancelled';
  questions: Question[];
  answers: Answer[];
  summary?: InterviewSummary;
  createdAt: string;
  updatedAt: string;
}

export interface Question {
  id: string;
  text: string;
  order: number;
  timeLimit?: number;
}

export interface Answer {
  id: string;
  questionId: string;
  text: string;
  audioUrl?: string;
  duration?: number;
  timestamp: string;
}

export interface InterviewSummary {
  overallScore: number;
  maxScore: number;
  generalFeedback: string;
  recommendation: 'Recommended' | 'Not Recommended' | 'Conditionally Recommended';
  categories: {
    name: string;
    score: number;
    maxScore: number;
    feedback: string[];
  }[];
}

export interface User {
  id: string;
  email: string;
  name: string;
  profilePicture?: string;
  credits: number;
  createdAt: string;
  updatedAt: string;
}

export interface VoiceCall {
  id: string;
  interviewId: string;
  status: 'in-progress' | 'completed' | 'failed';
  duration?: number;
  recordingUrl?: string;
  transcript?: string;
}