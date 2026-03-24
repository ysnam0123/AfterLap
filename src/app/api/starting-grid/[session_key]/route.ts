import { NextResponse } from 'next/server';
import {
  ensureStartingGridData,
  getStartingGrid,
} from '@/lib/server/race_result/starting_grid';

export async function GET(
  req: Request,
  context: { params: { session_key: string } },
) {
  const sessionKey = Number(context.params.session_key);

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
    return NextResponse.json(
      { error: 'Failed to fetch starting grid' },
      { status: 500 },
    );
  }
}
