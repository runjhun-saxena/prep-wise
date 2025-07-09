import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { FeedbackCategory } from "@/types/interview"

interface FeedbackBlockProps {
  category: FeedbackCategory
}

export function FeedbackBlock({ category }: FeedbackBlockProps) {
  const percentage = (category.score / category.maxScore) * 100

  return (
    <Card className="bg-gray-800/50 border-gray-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center justify-between">
          <span>{category.name}</span>
          <span className="text-sm font-normal text-gray-400">
            ({category.score}/{category.maxScore})
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {category.feedback.map((item, index) => (
            <div key={index} className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0" />
              <p className="text-gray-300 text-sm">{item}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
