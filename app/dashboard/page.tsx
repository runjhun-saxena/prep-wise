"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { InterviewCard } from "@/components/InterviewCard"
import { Logo } from "@/components/ui/logo"
import { User, Plus } from "lucide-react"
import type { Interview } from "@/types/interview"
import { useRouter } from "next/navigation"

const pastInterviews: Interview[] = [
  {
    id: "1",
    title: "Frontend Dev Interview",
    type: "Technical",
    role: "Frontend Developer",
    duration: 30,
    score: 12,
    date: "2025-02-28",
    status: "completed",
    icon: "H",
    color: "#8B5CF6",
  },
  {
    id: "2",
    title: "Behavioral Interview",
    type: "Non-Technical",
    role: "General",
    duration: 20,
    score: 54,
    date: "2025-02-23",
    status: "completed",
    icon: "f",
    color: "#3B82F6",
  },
  {
    id: "3",
    title: "Backend Dev Interview",
    type: "Technical",
    role: "Backend Developer",
    duration: 45,
    score: 94,
    date: "2025-02-21",
    status: "completed",
    icon: "A",
    color: "#EF4444",
  },
]

const availableInterviews: Interview[] = [
  {
    id: "4",
    title: "Full-Stack Dev Interview",
    type: "Technical",
    role: "Full-Stack Developer",
    duration: 60,
    date: "",
    status: "scheduled",
    icon: "Y",
    color: "#8B5CF6",
  },
  {
    id: "5",
    title: "DevOps & Cloud Interview",
    type: "Technical",
    role: "DevOps Engineer",
    duration: 45,
    date: "",
    status: "scheduled",
    icon: "🔶",
    color: "#F97316",
  },
  {
    id: "6",
    title: "HR Screening Interview",
    type: "Non-Technical",
    role: "General",
    duration: 30,
    date: "",
    status: "scheduled",
    icon: "💬",
    color: "#06B6D4",
  },
  {
    id: "7",
    title: "System Design Interview",
    type: "Technical",
    role: "Senior Developer",
    duration: 60,
    date: "",
    status: "scheduled",
    icon: "📦",
    color: "#3B82F6",
  },
  {
    id: "8",
    title: "Business Analyst Interview",
    type: "Non-Technical",
    role: "Business Analyst",
    duration: 40,
    date: "",
    status: "scheduled",
    icon: "📊",
    color: "#10B981",
  },
  {
    id: "9",
    title: "Mobile App Dev Interview",
    type: "Technical",
    role: "Mobile Developer",
    duration: 50,
    date: "",
    status: "scheduled",
    icon: "📱",
    color: "#EF4444",
  },
]

export default function DashboardPage() {
  const router = useRouter()
  const [user] = useState({
    name: "Adrian Hajdin",
    interviewCredits: 5,
    plan: "free" as const,
  })

  const handleViewInterview = (interview: Interview) => {
    router.push("/interview/summary")
  }

  const handleTakeInterview = (interview: Interview) => {
    router.push("/interview/setup")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-purple-900/20 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Logo />
          <div className="flex items-center gap-4">
            <Badge className="bg-purple-600 text-white">{user.interviewCredits} credits remaining</Badge>
            <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-gray-300" />
            </div>
          </div>
        </div>

        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Welcome back, {user.name}!</h1>
          <p className="text-gray-400">Ready to practice your interview skills?</p>
        </div>

        {/* Past Interviews */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">Your Past Interviews</h2>
            <Button
              variant="outline"
              className="border-gray-600 text-gray-300 hover:bg-gray-700 bg-transparent"
              onClick={() => router.push("/interview/setup")}
            >
              <Plus className="w-4 h-4 mr-2" />
              New Interview
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pastInterviews.map((interview) => (
              <InterviewCard key={interview.id} interview={interview} variant="past" onAction={handleViewInterview} />
            ))}
          </div>
        </section>

        {/* Available Interviews */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">Pick Your Interview</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {availableInterviews.map((interview) => (
              <InterviewCard
                key={interview.id}
                interview={interview}
                variant="available"
                onAction={handleTakeInterview}
              />
            ))}
          </div>
        </section>

        {/* Upgrade Prompt */}
        {user.plan === "free" && (
          <Card className="bg-gradient-to-r from-purple-600/20 to-purple-800/20 border-purple-500/30 mt-12">
            <CardContent className="p-6 text-center">
              <h3 className="text-xl font-bold text-white mb-2">Unlock More Interviews</h3>
              <p className="text-gray-300 mb-4">Upgrade to Premium for unlimited interviews and advanced feedback</p>
              <Button onClick={() => router.push("/pricing")} className="bg-purple-600 hover:bg-purple-700 text-white">
                Upgrade Now
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
