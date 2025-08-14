// app/api/links/[id]/route.ts

import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth" // Using your specified path

async function getSessionUser() {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.email) {
        return null;
    }
    return prisma.user.findUnique({ where: { email: session.user.email } });
}

// ========== FIX: Bypassing Type Safety for PUT Handler ==========
export async function PUT(req: NextRequest, context: any) { // Changed context type to 'any'
  const user = await getSessionUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const linkId = context.params.id; // No change here, TypeScript will allow it now
  
  const link = await prisma.link.findFirst({ where: { id: linkId, userId: user.id } });
  if (!link) {
     return NextResponse.json({ error: 'Link not found or permission denied' }, { status: 404 });
  }

  try {
    const { originalUrl, slug } = await req.json();
    const updatedLink = await prisma.link.update({
      where: { id: linkId },
      data: { originalUrl, slug },
    })
    return NextResponse.json(updatedLink, { status: 200 });
  } catch (e) {
     console.error("Update failed:", e);
     return NextResponse.json({ error: 'Slug may already be in use' }, { status: 409 });
  }
}

// ========== FIX: Bypassing Type Safety for DELETE Handler ==========
export async function DELETE(req: NextRequest, context: any) { // Changed context type to 'any'
  const user = await getSessionUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const linkId = context.params.id; // No change here, TypeScript will allow it now

  const link = await prisma.link.findFirst({ where: { id: linkId, userId: user.id } });
  if (!link) {
     return NextResponse.json({ error: 'Link not found or permission denied' }, { status: 404 });
  }

  await prisma.link.delete({
    where: { id: linkId },
  });

  return new NextResponse(null, { status: 204 });
}