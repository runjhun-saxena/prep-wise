"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "../context/auth-context";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { InterviewCard } from "@/components/InterviewCard";
import { Logo } from "@/components/ui/logo";
import { User as UserIcon, Plus } from "lucide-react";
import type { Interview } from "@/types/interview";

const pastInterviews: Interview[] = [/* ... */];
const availableInterviews: Interview[] = [/* ... */];

export default function DashboardPage() {
  const router = useRouter();
  const { user, loading } = useAuth();

  // Replace with data from DB if needed
  const [interviewCredits] = useState(1); // Example only
  const [plan] = useState<"free" | "premium">("free");

  const handleViewInterview = (interview: Interview) => {
    router.push("/interview/summary");
  };

  const handleTakeInterview = (interview: Interview) => {
    router.push("/interview/setup");
  };

  if (loading) return <p className="text-white text-center mt-20">Loading dashboard...</p>;

  if (!user) {
    router.push("/login"); // Redirect if not logged in
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-purple-900/20 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Logo />
          <div className="flex items-center gap-4">
            <Badge className="bg-purple-600 text-white">{interviewCredits} credits remaining</Badge>
            <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center">
              <UserIcon className="w-5 h-5 text-gray-300" />
            </div>
          </div>
        </div>

        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Welcome back, {user.displayName || user.email}!
          </h1>
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
          <h2 className="text-2xl font-bold text-white mb-6">Pick Your Interview</h2>
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
        {plan === "free" && (
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
  );
}
