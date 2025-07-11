"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Logo } from "@/components/ui/logo"
import { Mic, Brain, BarChart3, Users, Star, ArrowRight, Play, Zap, Target, Award } from "lucide-react"
import Link from "next/link"

const features = [
  {
    icon: <Brain className="w-8 h-8" />,
    title: "AI-Powered Interviews",
    description: "Practice with advanced AI that adapts to your responses and provides personalized feedback.",
  },
  {
    icon: <Mic className="w-8 h-8" />,
    title: "Voice Recognition",
    description: "Natural voice interactions with real-time transcription and analysis of your responses.",
  },
  {
    icon: <BarChart3 className="w-8 h-8" />,
    title: "Detailed Analytics",
    description: "Get comprehensive feedback on communication skills, technical knowledge, and areas for improvement.",
  },
  {
    icon: <Target className="w-8 h-8" />,
    title: "Role-Specific Practice",
    description: "Tailored interviews for Frontend, Backend, Full-Stack, DevOps, and more specialized roles.",
  },
  {
    icon: <Zap className="w-8 h-8" />,
    title: "Instant Feedback",
    description: "Receive immediate, actionable feedback to improve your interview performance quickly.",
  },
  {
    icon: <Award className="w-8 h-8" />,
    title: "Progress Tracking",
    description: "Monitor your improvement over time with detailed performance metrics and scoring.",
  },
]

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Frontend Developer",
    company: "Google",
    content:
      "PrepWise helped me land my dream job at Google. The AI feedback was incredibly detailed and helped me improve my communication skills.",
    rating: 5,
  },
  {
    name: "Michael Rodriguez",
    role: "Full-Stack Engineer",
    company: "Microsoft",
    content:
      "The technical interviews were spot-on. I felt completely prepared for my Microsoft interview after practicing here.",
    rating: 5,
  },
  {
    name: "Emily Johnson",
    role: "DevOps Engineer",
    company: "Amazon",
    content:
      "Amazing platform! The variety of interview types and the quality of feedback is unmatched. Highly recommend!",
    rating: 5,
  },
]

const stats = [
  { number: "50K+", label: "Interviews Completed" },
  { number: "95%", label: "Success Rate" },
  { number: "500+", label: "Companies Covered" },
  { number: "4.9/5", label: "User Rating" },
]

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-purple-900/20">
      {/* Navigation */}
      <nav className="border-b border-gray-800/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Logo />

            <div className="flex items-center gap-4">
              <Link href="/login">
                <Button className="bg-purple-600 hover:bg-purple-700 text-white">Login</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white/20 rounded-full animate-pulse" />
          <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-white/30 rounded-full animate-pulse delay-1000" />
          <div className="absolute top-1/2 right-1/3 w-1.5 h-1.5 bg-white/25 rounded-full animate-pulse delay-500" />
          <div className="absolute top-1/3 left-1/2 w-1 h-1 bg-purple-400/30 rounded-full animate-pulse delay-700" />
        </div>

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <Badge className="bg-purple-600/20 text-purple-300 border-purple-500/30 mb-6">
            🚀 AI-Powered Interview Practice
          </Badge>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Master Your Next
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-600">
              {" "}
              Job Interview
            </span>
          </h1>

          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            Practice with AI-powered mock interviews tailored to your role. Get instant feedback, improve your skills,
            and land your dream job with confidence.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link href="/register">
              <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 text-lg">
                Start Practicing Free
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>

            <Button
              size="lg"
              variant="outline"
              className="border-gray-600 text-gray-300 hover:bg-gray-700 bg-transparent px-8 py-3 text-lg"
            >
              <Play className="mr-2 w-5 h-5" />
              Watch Demo
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-white mb-2">{stat.number}</div>
                <div className="text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Why Choose PrepWise?</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Our AI-powered platform provides the most realistic interview experience with personalized feedback to
              help you succeed.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="bg-gray-800/50 border-gray-700 hover:bg-gray-800/70 transition-all duration-300 group"
              >
                <CardContent className="p-6">
                  <div className="text-purple-400 mb-4 group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-800/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">How It Works</h2>
            <p className="text-xl text-gray-400">Get started in just 3 simple steps</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6">
                1
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Choose Your Role</h3>
              <p className="text-gray-400">
                Select from Frontend, Backend, Full-Stack, DevOps, or other specialized roles to get tailored interview
                questions.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6">
                2
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Practice with AI</h3>
              <p className="text-gray-400">
                Engage in realistic mock interviews with our advanced AI that adapts to your responses and asks
                follow-up questions.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6">
                3
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Get Feedback</h3>
              <p className="text-gray-400">
                Receive detailed feedback on your performance, including areas for improvement and personalized tips for
                success.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Success Stories</h2>
            <p className="text-xl text-gray-400">Join thousands of developers who landed their dream jobs</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-gray-800/50 border-gray-700">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-300 mb-6 italic">"{testimonial.content}"</p>
                  <div>
                    <div className="font-semibold text-white">{testimonial.name}</div>
                    <div className="text-gray-400">
                      {testimonial.role} at {testimonial.company}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-purple-600/20 to-purple-800/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">Ready to Ace Your Next Interview?</h2>
          <p className="text-xl text-gray-300 mb-8">
            Join thousands of developers who have successfully landed their dream jobs with PrepWise.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 text-lg">
                Get Started Free
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href="/pricing">
              <Button
                size="lg"
                variant="outline"
                className="border-gray-600 text-gray-300 hover:bg-gray-700 bg-transparent px-8 py-3 text-lg"
              >
                View Pricing
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800/50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="col-span-2">
              <Logo className="mb-4" />
              <p className="text-gray-400 mb-4 max-w-md">
                PrepWise helps developers practice and master job interviews with AI-powered mock interviews and
                personalized feedback.
              </p>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-gray-300">4.9/5 rating</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-300">50K+ users</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-4">Product</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/pricing" className="hover:text-white transition-colors">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="/features" className="hover:text-white transition-colors">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="/demo" className="hover:text-white transition-colors">
                    Demo
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/help" className="hover:text-white transition-colors">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white transition-colors">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:text-white transition-colors">
                    Privacy
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800/50 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 PrepWise. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
