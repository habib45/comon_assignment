import { NextResponse } from 'next/server';
import mockData from '@/mock/mock-data.json';

export async function GET() {
  return NextResponse.json(mockData.games);
}
