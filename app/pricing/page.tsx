"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, X } from "lucide-react"
import { Logo } from "@/components/ui/logo"

const pricingPlans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Perfect for getting started",
    features: [
      { name: "5 interviews per month", included: true },
      { name: "Basic feedback", included: true },
      { name: "Technical interviews", included: true },
      { name: "Behavioral interviews", included: false },
      { name: "Advanced analytics", included: false },
      { name: "Custom interview types", included: false },
      { name: "Priority support", included: false },
    ],
    buttonText: "Current Plan",
    buttonVariant: "outline" as const,
    popular: false,
  },
  {
    name: "Premium",
    price: "$19",
    period: "per month",
    description: "For serious interview preparation",
    features: [
      { name: "Unlimited interviews", included: true },
      { name: "Advanced AI feedback", included: true },
      { name: "All interview types", included: true },
      { name: "Behavioral interviews", included: true },
      { name: "Advanced analytics", included: true },
      { name: "Custom interview types", included: true },
      { name: "Priority support", included: true },
    ],
    buttonText: "Upgrade Now",
    buttonVariant: "default" as const,
    popular: true,
  },
]

export default function PricingPage() {
  const handleSubscribe = (planName: string) => {
    console.log(`Subscribing to ${planName} plan`)
    // Integrate with Stripe here
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-purple-900/20 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <Logo />
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">Choose Your Plan</h1>
          <p className="text-gray-400 text-lg">Select the perfect plan to accelerate your interview preparation</p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {pricingPlans.map((plan) => (
            <Card
              key={plan.name}
              className={`relative bg-gray-800/50 border-gray-700 ${plan.popular ? "ring-2 ring-purple-500" : ""}`}
            >
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-purple-600 text-white">
                  Most Popular
                </Badge>
              )}

              <CardHeader className="text-center pb-6">
                <CardTitle className="text-2xl font-bold text-white">{plan.name}</CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-white">{plan.price}</span>
                  <span className="text-gray-400 ml-2">/{plan.period}</span>
                </div>
                <p className="text-gray-400 mt-2">{plan.description}</p>
              </CardHeader>

              <CardContent>
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-3">
                      {feature.included ? (
                        <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                      ) : (
                        <X className="w-5 h-5 text-gray-500 flex-shrink-0" />
                      )}
                      <span className={`${feature.included ? "text-gray-300" : "text-gray-500"}`}>{feature.name}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  onClick={() => handleSubscribe(plan.name)}
                  variant={plan.buttonVariant}
                  className={`w-full ${
                    plan.buttonVariant === "default"
                      ? "bg-purple-600 hover:bg-purple-700 text-white"
                      : "border-gray-600 text-gray-300 hover:bg-gray-700"
                  }`}
                  disabled={plan.name === "Free"}
                >
                  {plan.buttonText}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold text-white mb-8">Frequently Asked Questions</h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <Card className="bg-gray-800/50 border-gray-700">
              <CardContent className="p-6">
                <h3 className="font-semibold text-white mb-2">Can I cancel anytime?</h3>
                <p className="text-gray-400">Yes, you can cancel your subscription at any time. No questions asked.</p>
              </CardContent>
            </Card>

            <Card className="bg-gray-800/50 border-gray-700">
              <CardContent className="p-6">
                <h3 className="font-semibold text-white mb-2">Do you offer refunds?</h3>
                <p className="text-gray-400">We offer a 30-day money-back guarantee for all premium subscriptions.</p>
              </CardContent>
            </Card>

            <Card className="bg-gray-800/50 border-gray-700">
              <CardContent className="p-6">
                <h3 className="font-semibold text-white mb-2">How accurate is the AI feedback?</h3>
                <p className="text-gray-400">
                  Our AI is trained on thousands of real interviews and provides industry-standard feedback.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gray-800/50 border-gray-700">
              <CardContent className="p-6">
                <h3 className="font-semibold text-white mb-2">Can I practice specific technologies?</h3>
                <p className="text-gray-400">
                  Yes, Premium users can create custom interviews for any technology stack.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
