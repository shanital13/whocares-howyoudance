"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export interface FlipCardField {
  name: string
  type?: string
  label: string
  placeholder?: string
}

export interface FlipCardProps {
  frontTitle?: string
  frontDescription?: string
  frontIllustration?: React.ReactNode
  backTitle?: string
  backDescription?: string
  backIllustration?: React.ReactNode
  successTitle?: string
  successDescription?: string
  successIllustration?: React.ReactNode
  fields?: FlipCardField[]
  onLogin?: (data: Record<string, string>) => Promise<boolean> | boolean
  loginButtonText?: string
  backButtonText?: string
  successButtonText?: string
  className?: string
  cardWidth?: number
  cardHeight?: number
  showBackInitially?: boolean
}

export default function FlipCard({
  frontTitle = "Welcome Back 👋",
  frontDescription = "Login to continue",
  frontIllustration,
  backTitle = "Login Form",
  backDescription = "Fill your details",
  backIllustration,
  successTitle = "Login Successful 🎉",
  successDescription = "You are now logged in!",
  successIllustration,
  fields = [
    { name: "email", type: "email", label: "Email", placeholder: "Enter your email" },
    { name: "password", type: "password", label: "Password", placeholder: "Enter your password" },
  ],
  onLogin,
  loginButtonText = "Login",
  backButtonText = "Back",
  successButtonText = "Continue",
  className,
  cardWidth = 320,
  cardHeight = 420,
  showBackInitially = false,
}: FlipCardProps) {
  const [flipped, setFlipped] = React.useState(showBackInitially)
  const [formData, setFormData] = React.useState<Record<string, string>>({})
  const [success, setSuccess] = React.useState(false)
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    try {
      if (onLogin) {
        const result = await onLogin(formData)
        if (result) {
          setSuccess(true)
          setFlipped(false)
        } else {
          setError("Invalid credentials")
        }
      } else {
        setSuccess(true)
        setFlipped(false)
      }
    } catch (err) {
      setError("Login failed")
    }
    setLoading(false)
  }

  return (
    <div
      className={cn("relative mx-auto", className)}
      style={{ width: `${cardWidth}px`, height: `${cardHeight}px`, perspective: "1000px" }}
    >
      <motion.div
        className="absolute inset-0"
        initial={false}
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* FRONT SIDE */}
        <Card className="absolute inset-0 flex flex-col items-center justify-center text-center" style={{ backfaceVisibility: "hidden" }}>
          {!success ? (
            <>
              {frontIllustration ?? <div className="mb-4 text-6xl">👋</div>}
              <CardHeader>
                <CardTitle className="text-2xl font-bold">{frontTitle}</CardTitle>
              </CardHeader>
              <p className="mb-4 text-sm text-muted-foreground">{frontDescription}</p>
              <Button onClick={() => setFlipped(true)}>
                {loginButtonText}
              </Button>
            </>
          ) : (
            <>
              {successIllustration ?? <div className="mb-4 text-6xl">🎉</div>}
              <CardHeader>
                <CardTitle className="text-2xl font-bold">{successTitle}</CardTitle>
              </CardHeader>
              <p className="mb-4 text-sm text-muted-foreground">{successDescription}</p>
              <Button>{successButtonText}</Button>
            </>
          )}
        </Card>

        {/* BACK SIDE */}
        <Card className="absolute inset-0 overflow-auto" style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}>
          {backIllustration}
          <CardHeader>
            <CardTitle className="text-xl font-bold">{backTitle}</CardTitle>
          </CardHeader>
          <p className="mb-4 px-6 text-sm text-muted-foreground">{backDescription}</p>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {fields.map((field) => (
                <div key={field.name} className="space-y-1">
                  <label htmlFor={field.name} className="block text-sm font-medium">
                    {field.label}
                  </label>
                  <Input
                    id={field.name}
                    name={field.name}
                    type={field.type || "text"}
                    placeholder={field.placeholder}
                    onChange={handleChange}
                  />
                </div>
              ))}
              {error && <p className="text-sm text-destructive">{error}</p>}
              <Button type="submit" disabled={loading} className="w-full">
                {loading ? "Loading..." : loginButtonText}
              </Button>
              <Button type="button" variant="ghost" className="w-full" onClick={() => setFlipped(false)}>
                {backButtonText}
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
