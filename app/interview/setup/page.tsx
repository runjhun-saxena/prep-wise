"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Upload } from "lucide-react"
import { Logo } from "@/components/ui/logo"
import { useRouter } from "next/navigation"

export default function InterviewSetupPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    interviewType: "",
    role: "",
    techStack: "",
    duration: "",
    profilePicture: null as File | null,
  })
  const [loading, setLoading] = useState(false)

  const handleSelectChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    setFormData((prev) => ({ ...prev, profilePicture: file }))
  }

  const handleStartInterview = async () => {
    setLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    console.log("Interview setup:", formData)
    router.push("/interview/session")
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-900 to-purple-900/20" />

      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white/20 rounded-full animate-pulse" />
        <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-white/30 rounded-full animate-pulse delay-1000" />
        <div className="absolute top-1/2 right-1/3 w-1.5 h-1.5 bg-white/25 rounded-full animate-pulse delay-500" />
      </div>

      <Card className="w-full max-w-md bg-gray-800/50 border-gray-700 backdrop-blur-sm relative z-10">
        <CardHeader className="text-center pb-6">
          <div className="flex justify-center mb-4">
            <Logo />
          </div>
          <h1 className="text-xl font-semibold text-white">Starting Your Interview</h1>
          <p className="text-gray-400">Customize your mock interview to suit your needs.</p>
        </CardHeader>

        <CardContent className="space-y-4">
          <div>
            <Label className="text-gray-300">What type of interview would you like to practice?</Label>
            <Select onValueChange={(value) => handleSelectChange("interviewType", value)}>
              <SelectTrigger className="bg-gray-700/50 border-gray-600 text-white mt-1">
                <SelectValue placeholder="Technical" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700">
                <SelectItem value="technical">Technical</SelectItem>
                <SelectItem value="behavioral">Behavioral</SelectItem>
                <SelectItem value="system-design">System Design</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="text-gray-300">What role are you focusing on?</Label>
            <Select onValueChange={(value) => handleSelectChange("role", value)}>
              <SelectTrigger className="bg-gray-700/50 border-gray-600 text-white mt-1">
                <SelectValue placeholder="Select your role" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700">
                <SelectItem value="frontend-dev">Frontend Developer</SelectItem>
                <SelectItem value="backend-dev">Backend Developer</SelectItem>
                <SelectItem value="fullstack-dev">Full-Stack Developer</SelectItem>
                <SelectItem value="data-analyst">Data Analyst</SelectItem>
                <SelectItem value="devops">DevOps Engineer</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="text-gray-300">Which tech stack would you like to focus on?</Label>
            <Select onValueChange={(value) => handleSelectChange("techStack", value)}>
              <SelectTrigger className="bg-gray-700/50 border-gray-600 text-white mt-1">
                <SelectValue placeholder="Select your preferred tech stack" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700">
                <SelectItem value="react">React/Next.js</SelectItem>
                <SelectItem value="vue">Vue.js</SelectItem>
                <SelectItem value="angular">Angular</SelectItem>
                <SelectItem value="node">Node.js</SelectItem>
                <SelectItem value="python">Python/Django</SelectItem>
                <SelectItem value="java">Java/Spring</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="text-gray-300">How long would you like the interview to be?</Label>
            <Select onValueChange={(value) => handleSelectChange("duration", value)}>
              <SelectTrigger className="bg-gray-700/50 border-gray-600 text-white mt-1">
                <SelectValue placeholder="10 minutes" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700">
                <SelectItem value="10">10 minutes</SelectItem>
                <SelectItem value="20">20 minutes</SelectItem>
                <SelectItem value="30">30 minutes</SelectItem>
                <SelectItem value="45">45 minutes</SelectItem>
                <SelectItem value="60">60 minutes</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="text-gray-300">Profile picture</Label>
            <div className="mt-1">
              <label className="flex items-center justify-center w-full h-12 bg-gray-700/50 border border-gray-600 rounded-md cursor-pointer hover:bg-gray-700/70 transition-colors">
                <Upload className="w-4 h-4 text-gray-400 mr-2" />
                <span className="text-gray-400">
                  {formData.profilePicture ? formData.profilePicture.name : "Upload an image"}
                </span>
                <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
              </label>
            </div>
          </div>

          <Button
            onClick={handleStartInterview}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white mt-6"
            disabled={loading || !formData.interviewType || !formData.role}
          >
            {loading ? "Starting Interview..." : "Start Interview"}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
