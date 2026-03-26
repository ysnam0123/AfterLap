import { NextResponse } from 'next/server';
import { ensureResultData, getSessionResult } from '@/lib/server/sessionResult';

// Next.js 15+ 에서는 params를 Promise로 감싸야 에러가 나지 않습니다.
export async function GET(
  req: Request,
  { params }: { params: Promise<{ session_key: string }> },
) {
  try {
    const resolvedParams = await params;
    const sessionKey = Number(resolvedParams.session_key);

    if (!sessionKey || Number.isNaN(sessionKey)) {
      return NextResponse.json(
        { error: 'Invalid session_key' },
        { status: 400 },
      );
    }
    let data = await getSessionResult(sessionKey);

    if (!data || data.length === 0) {
      await ensureResultData(sessionKey);
      data = await getSessionResult(sessionKey);
    }

    const safeData = JSON.parse(
      JSON.stringify(data, (key, value) =>
        typeof value === 'bigint' ? value.toString() : value,
      ),
    );

    return NextResponse.json(safeData);
  } catch (error) {
    console.error('🔥 session-result API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch session result' },
      { status: 500 },
    );
  }
}
