import { revalidatePath, revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { path, tag, secret } = body;

    // Verify the secret to prevent unauthorized revalidation
    if (secret !== process.env.REVALIDATION_SECRET) {
      return NextResponse.json(
        { message: 'Invalid secret' },
        { status: 401 }
      );
    }

    // Revalidate by path if provided
    if (path) {
      revalidatePath(path);
    }

    // Revalidate by tag if provided
    if (tag) {
      revalidateTag(tag);
    }

    return NextResponse.json({
      revalidated: true,
      now: Date.now(),
      path,
      tag,
    });
  } catch (error) {
    return NextResponse.json(
      { message: 'Error revalidating' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Revalidation API endpoint',
    usage: {
      method: 'POST',
      body: {
        path: 'optional - path to revalidate',
        tag: 'optional - tag to revalidate',
        secret: 'required - revalidation secret'
      }
    }
  });
} 