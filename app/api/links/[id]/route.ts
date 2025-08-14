import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

async function getSessionUser() {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.email) {
        return null;
    }
    return prisma.user.findUnique({ where: { email: session.user.email } });
}


export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const user = await getSessionUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const linkId = params.id;
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
  } catch (error) {
     return NextResponse.json({ error: 'Slug may already be in use' }, { status: 409 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const user = await getSessionUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const linkId = params.id;
  const link = await prisma.link.findFirst({ where: { id: linkId, userId: user.id } });

  if (!link) {
     return NextResponse.json({ error: 'Link not found or permission denied' }, { status: 404 });
  }

  await prisma.link.delete({
    where: { id: linkId },
  });

  return new NextResponse(null, { status: 204 });
}