"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"

interface TimerProps {
  duration: number // in seconds
  onTimeUp?: () => void
}

export function Timer({ duration, onTimeUp }: TimerProps) {
  const [timeLeft, setTimeLeft] = useState(duration)
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => {
          if (time <= 1) {
            setIsActive(false)
            onTimeUp?.()
            return 0
          }
          return time - 1
        })
      }, 1000)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isActive, timeLeft, onTimeUp])

  const startTimer = () => setIsActive(true)
  const pauseTimer = () => setIsActive(false)
  const resetTimer = () => {
    setTimeLeft(duration)
    setIsActive(false)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const progress = ((duration - timeLeft) / duration) * 100

  return (
    <Card className="bg-gray-800/50 border-gray-700">
      <CardContent className="p-4">
        <div className="text-center">
          <div className="text-2xl font-mono font-bold text-white mb-2">{formatTime(timeLeft)}</div>
          <div className="w-full bg-gray-700 rounded-full h-2 mb-4">
            <div
              className="bg-purple-600 h-2 rounded-full transition-all duration-1000"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex gap-2 justify-center">
            <button
              onClick={isActive ? pauseTimer : startTimer}
              className="px-3 py-1 bg-purple-600 text-white rounded text-sm hover:bg-purple-700"
            >
              {isActive ? "Pause" : "Start"}
            </button>
            <button onClick={resetTimer} className="px-3 py-1 bg-gray-600 text-white rounded text-sm hover:bg-gray-700">
              Reset
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
