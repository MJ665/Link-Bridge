// app/go/[slug]/route.ts

import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

// ========== FIX: Bypassing Type Safety for GET Handler ==========
export async function GET(
  req: NextRequest,
  context: any // Changed from '{ params }' to 'context: any'
) {
  try {
    // Extract slug from the context object
    const slug = context.params.slug;

    if (!slug) {
      return NextResponse.json({ error: 'Slug not provided' }, { status: 400 });
    }

    const link = await prisma.link.findUnique({
      where: { slug },
    });

    if (!link) {
      // It's better to redirect to a 'not found' page or the home page
      // instead of showing a JSON error to the end-user.
      return NextResponse.redirect(new URL('/?error=not-found', req.url));
    }

    // This update can happen in the background. We don't need to wait for it.
    prisma.link.update({
      where: { id: link.id },
      data: { clickCount: { increment: 1 } },
    }).catch(console.error); // Log errors if the update fails

    // Redirect to the original URL
    return NextResponse.redirect(new URL(link.originalUrl));

  } catch (error) {
    console.error("Redirect error:", error);
    // Redirect to an error page or home page in case of a server error
    return NextResponse.redirect(new URL('/?error=server-error', req.url));
  }
}