"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Star } from "lucide-react"
import type { Interview } from "@/types/interview"
import { formatDate } from "@/lib/utils"

interface InterviewCardProps {
  interview: Interview
  variant?: "past" | "available"
  onAction?: (interview: Interview) => void
}

export function InterviewCard({ interview, variant = "available", onAction }: InterviewCardProps) {
  const handleAction = () => {
    onAction?.(interview)
  }

  return (
    <Card className="bg-gray-800/50 border-gray-700 hover:bg-gray-800/70 transition-colors">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center text-white text-xl font-bold"
            style={{ backgroundColor: interview.color }}
          >
            {interview.icon}
          </div>
          <Badge
            variant={interview.type === "Technical" ? "default" : "secondary"}
            className={interview.type === "Technical" ? "bg-gray-700 text-gray-300" : "bg-purple-600 text-white"}
          >
            {interview.type}
          </Badge>
        </div>

        <h3 className="text-lg font-semibold text-white mb-2">{interview.title}</h3>

        {variant === "past" && interview.score && (
          <div className="flex items-center gap-4 mb-3">
            <div className="flex items-center gap-1 text-gray-400">
              <Calendar className="w-4 h-4" />
              <span className="text-sm">{formatDate(interview.date)}</span>
            </div>
            <div className="flex items-center gap-1 text-gray-400">
              <Star className="w-4 h-4" />
              <span className="text-sm">{interview.score}/100</span>
            </div>
          </div>
        )}

        <p className="text-gray-400 text-sm mb-4 line-clamp-3">
          This interview does not reflect serious interest or engagement from the candidate. Their responses are
          dismissive...
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-blue-500 rounded flex items-center justify-center">
              <span className="text-white text-xs">⚙</span>
            </div>
            <div className="w-5 h-5 bg-teal-500 rounded flex items-center justify-center">
              <span className="text-white text-xs">~</span>
            </div>
          </div>

          <Button onClick={handleAction} className="bg-purple-600 hover:bg-purple-700 text-white">
            {variant === "past" ? "View Interview" : "Take Interview"}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
