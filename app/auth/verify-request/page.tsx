
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function VerifyRequest() {
  return (
    <div className="flex items-center justify-center min-h-screen">
       <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Check your email</CardTitle>
          <CardDescription>A sign in link has been sent to your email address.</CardDescription>
        </CardHeader>
      </Card>
    </div>
  )
}