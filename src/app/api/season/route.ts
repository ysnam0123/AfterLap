import { ensureMeetings } from '@/lib/server/meetings';
import { getMeetingsWithStatusAndPodium } from '@/lib/server/meetingsWithPodium';
import { NextResponse } from 'next/server';
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const year = Number(searchParams.get('year'));

  await ensureMeetings(year); // 캐싱/DB sync 용

  const meetingStatus = await getMeetingsWithStatusAndPodium(year);

  return NextResponse.json({ meetingStatus });
}
