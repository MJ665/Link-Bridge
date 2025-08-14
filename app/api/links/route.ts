import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { nanoid } from 'nanoid'

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions)

  if (!session || !session.user?.email) {
    return new NextResponse(JSON.stringify({ error: 'Unauthorized' }), { status: 401 })
  }
  
  const user = await prisma.user.findUnique({ where: { email: session.user.email }})

  if (!user) {
    return new NextResponse(JSON.stringify({ error: 'User not found' }), { status: 404 })
  }

  const links = await prisma.link.findMany({
    where: { userId: user.id },
  })
  return new NextResponse(JSON.stringify(links), { status: 200 })
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)

  if (!session || !session.user?.email) {
    return new NextResponse(JSON.stringify({ error: 'Unauthorized' }), { status: 401 })
  }

  const user = await prisma.user.findUnique({ where: { email: session.user.email }})

  if (!user) {
    return new NextResponse(JSON.stringify({ error: 'User not found' }), { status: 404 })
  }
  
  const { originalUrl, slug } = await req.json()

  if (!originalUrl) {
    return new NextResponse(JSON.stringify({ error: 'Original URL is required' }), { status: 400 })
  }

  try {
    new URL(originalUrl);
  } catch (error) {
    return new NextResponse(JSON.stringify({ error: 'Invalid URL format' }), { status: 400 })
  }

  const finalSlug = slug || nanoid(7)
  
  try {
    const newLink = await prisma.link.create({
      data: {
        originalUrl,
        slug: finalSlug,
        userId: user.id,
      },
    })
    return new NextResponse(JSON.stringify(newLink), { status: 201 })
  } catch (error) {
    return new NextResponse(JSON.stringify({ error: 'Slug already taken' }), { status: 409 })
  }
}