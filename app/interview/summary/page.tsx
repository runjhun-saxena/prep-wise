"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { 
  CheckCircle, 
  XCircle, 
  AlertCircle, 
  Download, 
  Share, 
  RotateCcw,
  Loader2,
  Star,
  TrendingUp,
  TrendingDown,
  Award,
  Clock,
  MessageSquare
} from "lucide-react"
import { useRouter, useParams } from "next/navigation"
import { useInterview } from "@/app/hooks/useInterview"
import { Progress } from "@/components/ui/progress"

export default function InterviewSummaryPage() {
  const router = useRouter()
  const params = useParams()
  const interviewId = params.id as string
  
  const {
    interview,
    isLoading,
    error,
    getInterview,
    clearError,
    resetInterview
  } = useInterview()

  const [isDownloading, setIsDownloading] = useState(false)
  const [isSharing, setIsSharing] = useState(false)

  // Load interview on mount
  useEffect(() => {
    if (interviewId && !interview) {
      getInterview(interviewId)
    }
  }, [interviewId, interview, getInterview])

  const handleDownloadReport = async () => {
    setIsDownloading(true)
    try {
      // Create a downloadable report
      const reportData = {
        interview: interview,
        generatedAt: new Date().toISOString(),
        candidateName: interview?.userId || 'Anonymous'
      }
      
      const blob = new Blob([JSON.stringify(reportData, null, 2)], {
        type: 'application/json'
      })
      
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `interview-report-${interviewId}.json`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Failed to download report:', error)
    } finally {
      setIsDownloading(false)
    }
  }

  const handleShare = async () => {
    setIsSharing(true)
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'Interview Summary',
          text: `I just completed a ${interview?.role} interview with a score of ${interview?.summary?.overallScore}/${interview?.summary?.maxScore}!`,
          url: window.location.href
        })
      } else {
        // Fallback: copy to clipboard
        await navigator.clipboard.writeText(window.location.href)
        alert('Link copied to clipboard!')
      }
    } catch (error) {
      console.error('Failed to share:', error)
    } finally {
      setIsSharing(false)
    }
  }

  const handleStartNewInterview = () => {
    resetInterview()
    router.push('/interview/setup')
  }

  const getRecommendationColor = (recommendation: string) => {
    switch (recommendation) {
      case 'Recommended':
        return 'bg-green-600'
      case 'Conditionally Recommended':
        return 'bg-yellow-600'
      case 'Not Recommended':
        return 'bg-red-600'
      default:
        return 'bg-gray-600'
    }
  }

  const getRecommendationIcon = (recommendation: string) => {
    switch (recommendation) {
      case 'Recommended':
        return <CheckCircle className="w-4 h-4" />
      case 'Conditionally Recommended':
        return <AlertCircle className="w-4 h-4" />
      case 'Not Recommended':
        return <XCircle className="w-4 h-4" />
      default:
        return <AlertCircle className="w-4 h-4" />
    }
  }

  const getScoreColor = (score: number, maxScore: number) => {
    const percentage = (score / maxScore) * 100
    if (percentage >= 80) return 'text-green-400'
    if (percentage >= 60) return 'text-yellow-400'
    return 'text-red-400'
  }

  const getScorePercentage = (score: number, maxScore: number) => {
    return Math.round((score / maxScore) * 100)
  }

  // Loading state
  if (isLoading && !interview) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-purple-900/20 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-purple-600 mx-auto mb-4" />
          <p className="text-gray-400">Loading interview results...</p>
        </div>
      </div>
    )
  }

  // Error state
  if (error && !interview) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-purple-900/20 flex items-center justify-center p-4">
        <Card className="bg-gray-800/50 border-gray-700 max-w-md">
          <CardContent className="p-6">
            <Alert className="bg-red-950/50 border-red-800">
              <AlertCircle className="h-4 w-4 text-red-400" />
              <AlertDescription className="text-red-300">
                {error}
              </AlertDescription>
            </Alert>
            <div className="flex gap-2 mt-4">
              <Button 
                onClick={() => getInterview(interviewId)}
                className="bg-purple-600 hover:bg-purple-700"
              >
                Retry
              </Button>
              <Button 
                onClick={() => router.push('/interview/setup')}
                variant="outline"
                className="border-gray-600 text-gray-300 hover:bg-gray-700"
              >
                Start New Interview
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!interview || !interview.summary) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-purple-900/20 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-400 mb-4">Interview results not available</p>
          <Button 
            onClick={handleStartNewInterview}
            className="bg-purple-600 hover:bg-purple-700"
          >
            Start New Interview
          </Button>
        </div>
      </div>
    )
  }

  const { summary } = interview
  const overallPercentage = getScorePercentage(summary.overallScore, summary.maxScore)

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-purple-900/20 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
              <Award className="w-10 h-10 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Interview Complete!</h1>
          <p className="text-gray-400">
            {interview.role} • {interview.techStack} • {interview.interviewType}
          </p>
          <Badge className="mt-2 bg-purple-600/20 text-purple-300">
            <Clock className="w-3 h-3 mr-1" />
            {interview.duration} minutes
          </Badge>
        </div>

        {/* Overall Score */}
        <Card className="bg-gray-800/50 border-gray-700 mb-8">
          <CardHeader>
            <CardTitle className="text-white text-xl text-center">Overall Performance</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <div className="mb-6">
              <div className={`text-6xl font-bold mb-2 ${getScoreColor(summary.overallScore, summary.maxScore)}`}>
                {overallPercentage}%
              </div>
              <div className="text-gray-400">
                {summary.overallScore} out of {summary.maxScore} points
              </div>
              <Progress 
                value={overallPercentage} 
                className="w-full mt-4 h-3"
              />
            </div>
            
            <Badge className={`${getRecommendationColor(summary.recommendation)} text-white px-4 py-2 text-sm`}>
              {getRecommendationIcon(summary.recommendation)}
              <span className="ml-2">{summary.recommendation}</span>
            </Badge>
          </CardContent>
        </Card>

        {/* General Feedback */}
        <Card className="bg-gray-800/50 border-gray-700 mb-8">
          <CardHeader>
            <CardTitle className="text-white text-xl flex items-center">
              <MessageSquare className="w-5 h-5 mr-2" />
              General Feedback
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-300 leading-relaxed">{summary.generalFeedback}</p>
          </CardContent>
        </Card>

        {/* Category Breakdown */}
        <Card className="bg-gray-800/50 border-gray-700 mb-8">
          <CardHeader>
            <CardTitle className="text-white text-xl flex items-center">
              <TrendingUp className="w-5 h-5 mr-2" />
              Performance Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {summary.categories.map((category, index) => {
              const categoryPercentage = getScorePercentage(category.score, category.maxScore)
              return (
                <div key={index} className="border-b border-gray-700 pb-4 last:border-b-0">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-white font-semibold">{category.name}</h3>
                    <div className="flex items-center gap-2">
                      <span className={`font-bold ${getScoreColor(category.score, category.maxScore)}`}>
                        {categoryPercentage}%
                      </span>
                      <span className="text-gray-400 text-sm">
                        ({category.score}/{category.maxScore})
                      </span>
                    </div>
                  </div>
                  <Progress 
                    value={categoryPercentage} 
                    className="w-full mb-3 h-2"
                  />
                  <div className="space-y-1">
                    {category.feedback.map((feedback, feedbackIndex) => (
                      <p key={feedbackIndex} className="text-gray-400 text-sm">
                        • {feedback}
                      </p>
                    ))}
                  </div>
                </div>
              )
            })}
          </CardContent>
        </Card>

        {/* Interview Statistics */}
        <Card className="bg-gray-800/50 border-gray-700 mb-8">
          <CardHeader>
            <CardTitle className="text-white text-xl">Interview Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400 mb-1">
                  {interview.questions.length}
                </div>
                <div className="text-gray-400 text-sm">Questions</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400 mb-1">
                  {interview.answers.length}
                </div>
                <div className="text-gray-400 text-sm">Answers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400 mb-1">
                  {interview.duration}m
                </div>
                <div className="text-gray-400 text-sm">Duration</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-400 mb-1">
                  {new Date(interview.createdAt).toLocaleDateString()}
                </div>
                <div className="text-gray-400 text-sm">Completed</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 justify-center">
          <Button
            onClick={handleDownloadReport}
            className="bg-blue-600 hover:bg-blue-700 text-white"
            disabled={isDownloading}
          >
            {isDownloading ? (
              <Loader2 className="w-4 h-4 animate-spin mr-2" />
            ) : (
              <Download className="w-4 h-4 mr-2" />
            )}
            Download Report
          </Button>

          <Button
            onClick={handleShare}
            variant="outline"
            className="border-gray-600 text-gray-300 hover:bg-gray-700"
            disabled={isSharing}
          >
            {isSharing ? (
              <Loader2 className="w-4 h-4 animate-spin mr-2" />
            ) : (
              <Share className="w-4 h-4 mr-2" />
            )}
            Share Results
          </Button>

          <Button
            onClick={handleStartNewInterview}
            className="bg-purple-600 hover:bg-purple-700 text-white"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Start New Interview
          </Button>

          <Button
            onClick={() => router.push('/dashboard')}
            variant="outline"
            className="border-gray-600 text-gray-300 hover:bg-gray-700"
          >
            View All Interviews
          </Button>
        </div>
      </div>
    </div>
  )
}