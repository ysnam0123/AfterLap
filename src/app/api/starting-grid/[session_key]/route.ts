import { NextResponse } from 'next/server';
import {
  ensureStartingGridData,
  getStartingGrid,
} from '@/lib/server/race_result/starting_grid';

export async function GET(
  req: Request,
  { params }: { params: Promise<{ session_key: string }> },
) {
  const sessionKey = await Number(params);

  if (!sessionKey || Number.isNaN(sessionKey)) {
    return NextResponse.json({ error: 'Invalid session_key' }, { status: 400 });
  }

  try {
    let data = await getStartingGrid(sessionKey);

    if (!data || data.length === 0) {
      await ensureStartingGridData(sessionKey);
      data = await getStartingGrid(sessionKey);
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('스타팅그리드 에러:', error);
    return NextResponse.json(
      { error: 'Failed to fetch starting grid' },
      { status: 500 },
    );
  }
}
