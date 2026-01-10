import { NextResponse } from 'next/server';
import { auth, currentUser } from '@clerk/nextjs/server';
import { prisma } from '@/lib/prisma';

export async function POST() {
  console.log('Auth Sync Hit');
  const { userId } = await auth();

  const user = await currentUser();

  if (!userId || !user) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  const email = user.emailAddresses[0]?.emailAddress;

  if (!email) {
    return new NextResponse('Email not found', { status: 400 });
  }

  const dbUser = await prisma.user.upsert({
    where: { clerkId: userId },
    update: {
      name: user.firstName ?? '',
      imageUrl: user.imageUrl,
    },
    create: {
      clerkId: userId,
      email,
      name: user.firstName ?? '',
      imageUrl: user.imageUrl,
      onboarded: false,
    },
  });

  console.log('User Saved', dbUser);

  return NextResponse.json(dbUser);
}
