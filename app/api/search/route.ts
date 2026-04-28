import { NextResponse } from 'next/server';
import { searchContent } from '@/lib/dataService';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q')?.toString() ?? '';
  const results = await searchContent(query);
  return NextResponse.json(results);
}
