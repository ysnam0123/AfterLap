// 여러 데이터를 부를땐 이런 식

import { NextResponse } from 'next/server';
import { getLiveSession } from '@/lib/server/liveSession';
import { getNextMeeting } from '@/lib/server/nextMeeting';
import { getMeetingsWithStatusAndPodium } from '@/lib/server/meetingsWithPodium';
import { getDriverRanking } from '@/lib/server/driverRanking';
import { getTeamSeasonRanking } from '@/lib/server/teamRanking';

export async function GET() {
  try {
    // ✅ 병렬 실행 (중요)
    const [
      liveSession,
      nextMeeting,
      meetingsWithPodium,
      driverRanking,
      teamRanking,
    ] = await Promise.all([
      getLiveSession(),
      getNextMeeting(),
      getMeetingsWithStatusAndPodium(2026),
      getDriverRanking(2026),
      getTeamSeasonRanking(2026),
    ]);

    return NextResponse.json({
      liveSession,
      nextMeeting,
      meetingsWithPodium,
      driverRanking,
      teamRanking,
    });
  } catch (error) {
    console.error('home API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch home data' },
      { status: 500 },
    );
  }
}
