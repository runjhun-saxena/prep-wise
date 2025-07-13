//setup
"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Upload, AlertCircle } from "lucide-react"
import { Logo } from "@/components/ui/logo"
import { useRouter } from "next/navigation"
import { useInterview } from "@/app/hooks/useInterview"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function InterviewSetupPage() {
  const router = useRouter()
  const { startInterview, isLoading, error, clearError } = useInterview()
  
  const [formData, setFormData] = useState({
    interviewType: "",
    role: "",
    techStack: "",
    duration: "",
    profilePicture: null as File | null,
  })

  const handleSelectChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (error) clearError()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    setFormData((prev) => ({ ...prev, profilePicture: file }))
  }

  const handleStartInterview = async () => {
    try {
      clearError()
      
      // Validate required fields
      if (!formData.interviewType || !formData.role || !formData.techStack || !formData.duration) {
        throw new Error("Please fill in all required fields")
      }

      const interview = await startInterview({
        interviewType: formData.interviewType,
        role: formData.role,
        techStack: formData.techStack,
        duration: formData.duration,
        profilePicture: formData.profilePicture || undefined,
      })

      // Navigate to interview session with interview ID
      router.push(`/interview/session/${interview.id}`)
    } catch (error) {
      console.error("Failed to start interview:", error)
      // Error is handled by the hook
    }
  }

  const isFormValid = formData.interviewType && formData.role && formData.techStack && formData.duration

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
          {/* Error Alert */}
          {error && (
            <Alert className="bg-red-950/50 border-red-800">
              <AlertCircle className="h-4 w-4 text-red-400" />
              <AlertDescription className="text-red-300">
                {error}
              </AlertDescription>
            </Alert>
          )}

          <div>
            <Label className="text-gray-300">What type of interview would you like to practice? *</Label>
            <Select 
              value={formData.interviewType}
              onValueChange={(value) => handleSelectChange("interviewType", value)}
            >
              <SelectTrigger className="bg-gray-700/50 border-gray-600 text-white mt-1">
                <SelectValue placeholder="Select interview type" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700">
                <SelectItem value="technical">Technical</SelectItem>
                <SelectItem value="behavioral">Behavioral</SelectItem>
                <SelectItem value="system-design">System Design</SelectItem>
                <SelectItem value="mixed">Mixed (Technical + Behavioral)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="text-gray-300">What role are you focusing on? *</Label>
            <Select 
              value={formData.role}
              onValueChange={(value) => handleSelectChange("role", value)}
            >
              <SelectTrigger className="bg-gray-700/50 border-gray-600 text-white mt-1">
                <SelectValue placeholder="Select your role" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700">
                <SelectItem value="frontend-developer">Frontend Developer</SelectItem>
                <SelectItem value="backend-developer">Backend Developer</SelectItem>
                <SelectItem value="fullstack-developer">Full-Stack Developer</SelectItem>
                <SelectItem value="data-analyst">Data Analyst</SelectItem>
                <SelectItem value="data-scientist">Data Scientist</SelectItem>
                <SelectItem value="devops-engineer">DevOps Engineer</SelectItem>
                <SelectItem value="product-manager">Product Manager</SelectItem>
                <SelectItem value="ui-ux-designer">UI/UX Designer</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="text-gray-300">Which tech stack would you like to focus on? *</Label>
            <Select 
              value={formData.techStack}
              onValueChange={(value) => handleSelectChange("techStack", value)}
            >
              <SelectTrigger className="bg-gray-700/50 border-gray-600 text-white mt-1">
                <SelectValue placeholder="Select your preferred tech stack" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700">
                <SelectItem value="react-nextjs">React/Next.js</SelectItem>
                <SelectItem value="vue-nuxt">Vue.js/Nuxt.js</SelectItem>
                <SelectItem value="angular">Angular</SelectItem>
                <SelectItem value="nodejs">Node.js</SelectItem>
                <SelectItem value="python-django">Python/Django</SelectItem>
                <SelectItem value="python-flask">Python/Flask</SelectItem>
                <SelectItem value="java-spring">Java/Spring</SelectItem>
                <SelectItem value="dotnet">C#/.NET</SelectItem>
                <SelectItem value="php-laravel">PHP/Laravel</SelectItem>
                <SelectItem value="ruby-rails">Ruby/Rails</SelectItem>
                <SelectItem value="golang">Go</SelectItem>
                <SelectItem value="rust">Rust</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="text-gray-300">How long would you like the interview to be? *</Label>
            <Select 
              value={formData.duration}
              onValueChange={(value) => handleSelectChange("duration", value)}
            >
              <SelectTrigger className="bg-gray-700/50 border-gray-600 text-white mt-1">
                <SelectValue placeholder="Select duration" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700">
                <SelectItem value="10">10 minutes</SelectItem>
                <SelectItem value="15">15 minutes</SelectItem>
                <SelectItem value="20">20 minutes</SelectItem>
                <SelectItem value="30">30 minutes</SelectItem>
                <SelectItem value="45">45 minutes</SelectItem>
                <SelectItem value="60">60 minutes</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="text-gray-300">Profile picture (optional)</Label>
            <div className="mt-1">
              <label className="flex items-center justify-center w-full h-12 bg-gray-700/50 border border-gray-600 rounded-md cursor-pointer hover:bg-gray-700/70 transition-colors">
                <Upload className="w-4 h-4 text-gray-400 mr-2" />
                <span className="text-gray-400">
                  {formData.profilePicture 
                    ? `${formData.profilePicture.name} (${(formData.profilePicture.size / 1024 / 1024).toFixed(1)}MB)`
                    : "Upload an image"
                  }
                </span>
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={handleFileChange} 
                  className="hidden"
                  disabled={isLoading}
                />
              </label>
            </div>
          </div>

          <Button
            onClick={handleStartInterview}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isLoading || !isFormValid}
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Starting Interview...
              </div>
            ) : (
              "Start Interview"
            )}
          </Button>

          <p className="text-xs text-gray-500 text-center mt-2">
            * Required fields
          </p>
        </CardContent>
      </Card>
    </div>
  )
}