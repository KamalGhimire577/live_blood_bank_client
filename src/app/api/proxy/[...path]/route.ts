import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest, { params }: { params: { path: string[] } }) {
  const path = params.path.join('/');
  const url = new URL(request.url);
  const queryString = url.search;
  
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/${path}${queryString}`, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  
  const data = await response.json();
  return NextResponse.json(data);
}

export async function POST(request: NextRequest, { params }: { params: { path: string[] } }) {
  const path = params.path.join('/');
  const body = await request.json();
  
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/${path}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  
  const data = await response.json();
  return NextResponse.json(data);
}