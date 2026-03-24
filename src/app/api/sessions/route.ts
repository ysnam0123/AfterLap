import { NextResponse } from 'next/server';
import { ensureSessions } from '@/lib/server/sessions';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const meetingKey = Number(searchParams.get('meeting_key'));

  const data = await ensureSessions(meetingKey);

  return NextResponse.json(data);
}
