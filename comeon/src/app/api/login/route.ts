import { NextRequest, NextResponse } from 'next/server';
import { SignJWT } from 'jose';
import { cookies } from 'next/headers';
import { validateCredentials } from '@/lib/players';
import { getJwtSecretKey } from '@/lib/auth';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const username = typeof body?.username === 'string' ? body.username.trim().toLowerCase() : '';
  const password = typeof body?.password === 'string' ? body.password : '';

  if (!username || !password) {
    return NextResponse.json({ message: 'Username and password are required' }, { status: 400 });
  }

  const player = await validateCredentials(username, password);
  if (player) {
    const token = await new SignJWT({ username })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('1h')
      .sign(getJwtSecretKey());

    (await cookies()).set('session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60,
      path: '/',
      sameSite: 'lax',
    });

    return NextResponse.json({ status: 'success', player });
  }

  return NextResponse.json({ message: 'Invalid username or password' }, { status: 401 });
}
