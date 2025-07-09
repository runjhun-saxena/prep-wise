"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, Calendar, User } from "lucide-react"
import { FeedbackBlock } from "@/components/FeedBlock"
import { Logo } from "@/components/ui/logo"
import { useRouter } from "next/navigation"

const mockFeedback = {
  overallScore: 12,
  maxScore: 100,
  date: "Feb 28, 2025 - 3:45 PM",
  generalFeedback:
    "This interview does not reflect serious interest or engagement from the candidate. Their responses are dismissive, vague, or outright negative, making it difficult to assess their qualifications, motivation, or suitability for the role.",
  recommendation: "Not Recommended" as const,
  categories: [
    {
      name: "Enthusiasm & Interest",
      score: 0,
      maxScore: 20,
      feedback: [
        'The candidate openly states, "I really don\'t," when asked why they want to work for the company.',
        'Their response to future career plans ("Probably in some other company") indicates a lack of commitment.',
      ],
    },
    {
      name: "Communication Skills",
      score: 5,
      maxScore: 20,
      feedback: [
        "Responses are brief and unhelpful.",
        'Some answers lack clarity (e.g., "What am I going to do in this role at this role?").',
        "A slight redeeming factor is that they remain polite.",
      ],
    },
    {
      name: "Self-Awareness & Reflection",
      score: 2,
      maxScore: 20,
      feedback: [
        "The candidate refuses to discuss their background and weaknesses.",
        'They claim to have "no weaknesses at all," which suggests a lack of self-awareness.',
      ],
    },
  ],
}

export default function InterviewSummaryPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-purple-900/20 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Logo />
          <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center">
            <User className="w-6 h-6 text-gray-300" />
          </div>
        </div>

        {/* Title and Score */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-4">
            Feedback on the Interview – Frontend Developer Interview
          </h1>

          <div className="flex items-center justify-center gap-8 mb-6">
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-500" />
              <span className="text-white">Overall Impression: </span>
              <span className="text-white font-semibold">
                {mockFeedback.overallScore}/{mockFeedback.maxScore}
              </span>
            </div>

            <div className="flex items-center gap-2 text-gray-400">
              <Calendar className="w-5 h-5" />
              <span>{mockFeedback.date}</span>
            </div>
          </div>
        </div>

        {/* General Feedback */}
        <Card className="bg-gray-800/50 border-gray-700 mb-8">
          <CardContent className="p-6">
            <p className="text-gray-300 leading-relaxed">{mockFeedback.generalFeedback}</p>
          </CardContent>
        </Card>

        {/* Breakdown of Evaluation */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">Breakdown of Evaluation:</h2>
          <div className="space-y-6">
            {mockFeedback.categories.map((category, index) => (
              <div key={index}>
                <h3 className="text-lg font-semibold text-white mb-3">
                  {index + 1}. {category.name} ({category.score}/{category.maxScore})
                </h3>
                <FeedbackBlock category={category} />
              </div>
            ))}
          </div>
        </div>

        {/* Final Verdict */}
        <Card className="bg-gray-800/50 border-gray-700 mb-8">
          <CardHeader>
            <CardTitle className="text-white">Final Verdict:</CardTitle>
          </CardHeader>
          <CardContent>
            <Badge variant="destructive" className="bg-red-600 text-white text-lg px-4 py-2">
              {mockFeedback.recommendation}
            </Badge>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex gap-4 justify-center">
          <Button onClick={() => router.push("/dashboard")} className="bg-purple-600 hover:bg-purple-700 text-white">
            Back to Dashboard
          </Button>
          <Button
            onClick={() => router.push("/interview/setup")}
            variant="outline"
            className="border-gray-600 text-gray-300 hover:bg-gray-700"
          >
            Take Another Interview
          </Button>
        </div>
      </div>
    </div>
  )
}
