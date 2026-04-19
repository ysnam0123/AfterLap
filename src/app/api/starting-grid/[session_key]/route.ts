import { NextResponse } from 'next/server';
import {
  ensureStartingGridData,
  getStartingGrid,
} from '@/lib/server/race_result/starting_grid';

export async function GET(
  req: Request,
  { params }: { params: Promise<{ session_key: string }> },
) {
  try {
    const session_key = await params;
    const sessionKey = Number(session_key.session_key);

    if (!sessionKey || Number.isNaN(sessionKey)) {
      return NextResponse.json(
        { error: 'Invalid session_key' },
        { status: 400 },
      );
    }
    let data = await getStartingGrid(sessionKey);

    if (!data || data.length === 0) {
      await ensureStartingGridData(sessionKey);
      data = await getStartingGrid(sessionKey);
    }
    const safeData = JSON.parse(
      JSON.stringify(data, (key, value) =>
        typeof value === 'bigint' ? value.toString() : value,
      ),
    );

    return NextResponse.json(safeData);
  } catch (error) {
    console.error('스타팅그리드 에러:', error);
    return NextResponse.json(
      { error: 'Failed to fetch starting grid' },
      { status: 500 },
    );
  }
}
