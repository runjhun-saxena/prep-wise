export interface Interview {
  id: string
  title: string
  type: "Technical" | "Non-Technical"
  role: string
  techStack?: string
  duration: number
  score?: number
  date: string
  status: "completed" | "in-progress" | "scheduled"
  feedback?: InterviewFeedback
  icon: string
  color: string
}

export interface InterviewFeedback {
  overallScore: number
  categories: FeedbackCategory[]
  generalFeedback: string
  recommendation: "Recommended" | "Not Recommended" | "Needs Improvement"
}

export interface FeedbackCategory {
  name: string
  score: number
  maxScore: number
  feedback: string[]
}

export interface InterviewSetup {
  interviewType: string
  role: string
  techStack: string
  duration: number
  yearsOfExperience: number
}

export interface User {
  id: string
  name: string
  email: string
  profilePicture?: string
  resume?: string
  interviewCredits: number
  plan: "free" | "premium"
}
