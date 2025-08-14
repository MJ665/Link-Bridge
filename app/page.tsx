'use client' // <--- ADD THIS LINE

import { Button } from "@/components/ui/button"
import { signIn, useSession, signOut } from "next-auth/react"
import Link from "next/link"

export default function Home() {
  const { data: session } = useSession()

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <h1 className="text-6xl font-bold">
          Welcome to{' '}
          <a className="text-blue-600" href="#">
            LinkBridge
          </a>
        </h1>

        <p className="mt-3 text-2xl">
          Create, manage, and track your short links with ease.
        </p>

        <div className="flex flex-wrap items-center justify-around max-w-4xl mt-6 sm:w-full">
          {session ? (
            <div className="flex gap-4">
              <Link href="/dashboard">
                <Button>Go to Dashboard</Button>
              </Link>
              <Button variant="outline" onClick={() => signOut()}>Sign Out</Button>
            </div>
          ) : (
            <Button onClick={() => signIn()}>Login/Signup</Button>
          )}
        </div>
      </main>
    </div>
  )
}