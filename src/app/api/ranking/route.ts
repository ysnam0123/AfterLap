import { NextResponse } from 'next/server';
import { getDriverRanking } from '@/lib/server/driverRanking';
import { getTeamSeasonRanking } from '@/lib/server/teamRanking';

export async function GET() {
  try {
    // ✅ 병렬 실행 (중요)
    const [driverRanking, teamRanking] = await Promise.all([
      getDriverRanking(2026),
      getTeamSeasonRanking(2026),
    ]);

    return NextResponse.json({
      driverRanking,
      teamRanking,
    });
  } catch (error) {
    console.error('ranking API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch ranking data' },
      { status: 500 },
    );
  }
}
