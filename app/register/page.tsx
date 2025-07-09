"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Upload } from "lucide-react"
import { Logo } from "@/components/ui/logo"

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    profilePicture: null as File | null,
    resume: null as File | null,
  })

  const [loading, setLoading] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, field: "profilePicture" | "resume") => {
    const file = e.target.files?.[0] || null
    setFormData((prev) => ({ ...prev, [field]: file }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    console.log("Registration data:", formData)
    setLoading(false)
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
          <h1 className="text-xl font-semibold text-white">Practice job interviews with AI</h1>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="fullName" className="text-gray-300">
                Full name
              </Label>
              <Input
                id="fullName"
                name="fullName"
                type="text"
                placeholder="Adrian Hajdin"
                value={formData.fullName}
                onChange={handleInputChange}
                className="bg-gray-700/50 border-gray-600 text-white placeholder:text-gray-400 mt-1"
                required
              />
            </div>

            <div>
              <Label htmlFor="email" className="text-gray-300">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="adrian@jsmastery.pro"
                value={formData.email}
                onChange={handleInputChange}
                className="bg-gray-700/50 border-gray-600 text-white placeholder:text-gray-400 mt-1"
                required
              />
            </div>

            <div>
              <Label htmlFor="password" className="text-gray-300">
                Password
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleInputChange}
                className="bg-gray-700/50 border-gray-600 text-white placeholder:text-gray-400 mt-1"
                required
              />
            </div>

            <div>
              <Label className="text-gray-300">Profile picture</Label>
              <div className="mt-1">
                <label className="flex items-center justify-center w-full h-12 bg-gray-700/50 border border-gray-600 rounded-md cursor-pointer hover:bg-gray-700/70 transition-colors">
                  <Upload className="w-4 h-4 text-gray-400 mr-2" />
                  <span className="text-gray-400">
                    {formData.profilePicture ? formData.profilePicture.name : "Upload an image"}
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileChange(e, "profilePicture")}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            <div>
              <Label className="text-gray-300">Resume</Label>
              <div className="mt-1">
                <label className="flex items-center justify-center w-full h-12 bg-gray-700/50 border border-gray-600 rounded-md cursor-pointer hover:bg-gray-700/70 transition-colors">
                  <Upload className="w-4 h-4 text-gray-400 mr-2" />
                  <span className="text-gray-400">{formData.resume ? formData.resume.name : "Upload a pdf"}</span>
                  <input type="file" accept=".pdf" onChange={(e) => handleFileChange(e, "resume")} className="hidden" />
                </label>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700 text-white mt-6"
              disabled={loading}
            >
              {loading ? "Creating account..." : "Create an account"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
