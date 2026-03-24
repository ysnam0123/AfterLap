import { NextResponse } from 'next/server';
import { getMeetingDetail } from '@/lib/server/meetingDetail';
import { ensureSessions } from '@/lib/server/sessions';

export async function GET(
  req: Request,
  { params }: { params: { meeting_key: string } },
) {
  const { meeting_key } = await params;

  const meetingKey = Number(meeting_key);

  const [meetingDetail, sessions] = await Promise.all([
    getMeetingDetail(meetingKey),
    ensureSessions(meetingKey),
  ]);

  return NextResponse.json({
    meetingDetail,
    sessions,
  });
}
