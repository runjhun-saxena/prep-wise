"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Mic, MicOff } from "lucide-react"
import { Timer } from "@/components/Timer"
import { useRouter } from "next/navigation"

const mockQuestions = [
  "Tell me about yourself and your experience with frontend development.",
  "How do you handle state management in React applications?",
  "Explain the difference between server-side rendering and client-side rendering.",
  "How would you optimize the performance of a React application?",
  "Describe your experience with testing in frontend applications.",
]

export default function InterviewSessionPage() {
  const router = useRouter()
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [isListening, setIsListening] = useState(false)
  const [voiceStatus, setVoiceStatus] = useState<"idle" | "listening" | "transcribing">("idle")

  const currentQuestion = mockQuestions[currentQuestionIndex]
  const isLastQuestion = currentQuestionIndex === mockQuestions.length - 1

  const handleVoiceToggle = () => {
    if (isListening) {
      setIsListening(false)
      setVoiceStatus("transcribing")
      // Simulate transcription delay
      setTimeout(() => {
        setVoiceStatus("idle")
      }, 2000)
    } else {
      setIsListening(true)
      setVoiceStatus("listening")
    }
  }

  const handleNextQuestion = () => {
    if (isLastQuestion) {
      // End interview and go to summary
      router.push("/interview/summary")
    } else {
      setCurrentQuestionIndex((prev) => prev + 1)
      setIsListening(false)
      setVoiceStatus("idle")
    }
  }

  const getVoiceStatusText = () => {
    switch (voiceStatus) {
      case "listening":
        return "Listening..."
      case "transcribing":
        return "Transcribing..."
      default:
        return "Click to start recording"
    }
  }

  const getVoiceStatusColor = () => {
    switch (voiceStatus) {
      case "listening":
        return "bg-green-600"
      case "transcribing":
        return "bg-yellow-600"
      default:
        return "bg-gray-600"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-purple-900/20 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white">Frontend Developer Interview</h1>
            <p className="text-gray-400">
              Question {currentQuestionIndex + 1} of {mockQuestions.length}
            </p>
          </div>
          <div className="w-64">
            <Timer
              duration={120} // 2 minutes per question
              onTimeUp={() => handleNextQuestion()}
            />
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-700 rounded-full h-2 mb-8">
          <div
            className="bg-purple-600 h-2 rounded-full transition-all duration-500"
            style={{ width: `${((currentQuestionIndex + 1) / mockQuestions.length) * 100}%` }}
          />
        </div>

        {/* Current Question */}
        <Card className="bg-gray-800/50 border-gray-700 mb-8">
          <CardHeader>
            <CardTitle className="text-white text-xl">Current Question</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-300 text-lg leading-relaxed">{currentQuestion}</p>
          </CardContent>
        </Card>

        {/* Voice Recording Section */}
        <Card className="bg-gray-800/50 border-gray-700 mb-8">
          <CardContent className="p-8">
            <div className="text-center">
              <button
                onClick={handleVoiceToggle}
                className={`w-20 h-20 rounded-full flex items-center justify-center mb-4 mx-auto transition-all duration-300 ${
                  isListening ? "bg-red-600 hover:bg-red-700" : "bg-purple-600 hover:bg-purple-700"
                }`}
              >
                {isListening ? <MicOff className="w-8 h-8 text-white" /> : <Mic className="w-8 h-8 text-white" />}
              </button>

              <Badge className={`${getVoiceStatusColor()} text-white mb-4`}>{getVoiceStatusText()}</Badge>

              <p className="text-gray-400 text-sm">
                {isListening
                  ? "Recording your answer... Click to stop when finished."
                  : "Click the microphone to start recording your answer."}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            className="border-gray-600 text-gray-300 hover:bg-gray-700 bg-transparent"
            disabled={currentQuestionIndex === 0}
            onClick={() => setCurrentQuestionIndex((prev) => Math.max(0, prev - 1))}
          >
            Previous Question
          </Button>

          <Button onClick={handleNextQuestion} className="bg-purple-600 hover:bg-purple-700 text-white">
            {isLastQuestion ? "Finish Interview" : "Next Question"}
          </Button>
        </div>
      </div>
    </div>
  )
}
