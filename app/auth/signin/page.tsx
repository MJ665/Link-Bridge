'use client'

import { signIn } from "next-auth/react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "sonner"

export default function SignIn() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const result = await signIn("email", {
        email,
        redirect: false, // We handle redirect manually or let NextAuth handle it after callback
        callbackUrl: '/dashboard', // <-- THIS IS THE CRUCIAL PART
    });

    if (result?.ok) {
        toast.success("Check your email for a magic link!");
        // The user will be redirected to the verify-request page by default
    } else {
        toast.error(result?.error || "An error occurred. Please try again.");
    }
    setLoading(false)
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Sign In to LinkBridge</CardTitle>
          <CardDescription>Enter your email below to get a magic link.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignIn}>
            <div className="grid gap-4">
                <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    />
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? "Sending..." : "Sign In with Email"}
                </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}