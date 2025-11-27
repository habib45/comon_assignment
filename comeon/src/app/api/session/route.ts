import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';
import { getJwtSecretKey } from '@/lib/auth';
import { findPlayer } from '@/lib/players';

export async function GET() {
  const sessionCookie = (await cookies()).get('session');

  if (sessionCookie) {
    try {
      const { payload } = await jwtVerify(sessionCookie.value, getJwtSecretKey());
      if (typeof payload.username === 'string') {
        const player = findPlayer(payload.username);
        if (!player) {
          return NextResponse.json({ isAuthenticated: false });
        }
        return NextResponse.json({ isAuthenticated: true, player });
      }
    } catch (error) {
      console.error('Failed to verify session', error);
      return NextResponse.json({ isAuthenticated: false }, { status: 401 });
    }
  }

  return NextResponse.json({ isAuthenticated: false });
}
