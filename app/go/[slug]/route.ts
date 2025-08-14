import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const slug = params.slug; // This is the line the error points to

    const link = await prisma.link.findUnique({
      where: { slug },
    });

    if (!link) {
      return NextResponse.json({ error: 'Link not found' }, { status: 404 });
    }

    // Update click count asynchronously; no need to wait for it
    await prisma.link.update({
      where: { id: link.id },
      data: { clickCount: { increment: 1 } },
    });

    // Redirect to the original URL
    return NextResponse.redirect(new URL(link.originalUrl));

  } catch (error) {
    console.error("Redirect error:", error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}