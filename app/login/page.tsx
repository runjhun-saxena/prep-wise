"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Logo } from "@/components/ui/logo";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { user } = await signInWithEmailAndPassword(auth, formData.email, formData.password);
      console.log("User signed in:", user);

      // Redirect to interview setup or dashboard
      router.push("/interview/setup");
    } catch (err: any) {
      console.error("Login failed:", err.message);
      alert(err.message); // Replace with toast if desired
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-900 to-purple-900/20" />

      <Card className="w-full max-w-md bg-gray-800/50 border-gray-700 backdrop-blur-sm relative z-10">
        <CardHeader className="text-center pb-6">
          <div className="flex justify-center mb-4">
            <Logo />
          </div>
          <h1 className="text-xl font-semibold text-white">Welcome back</h1>
          <p className="text-gray-400">Sign in to your account</p>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email" className="text-gray-300">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
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

            <Button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700 text-white mt-6"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign in"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-400">
              {"Don't have an account? "}
              <Link href="/register" className="text-purple-400 hover:text-purple-300">
                Sign up
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
