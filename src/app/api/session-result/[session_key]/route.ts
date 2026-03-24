import { NextResponse } from 'next/server';
import { ensureResultData, getSessionResult } from '@/lib/server/sessionResult';

// Next.js 15+ 에서는 params를 Promise로 감싸야 에러가 나지 않습니다.
export async function GET(
  req: Request,
  { params }: { params: Promise<{ session_key: string }> },
) {
  try {
    // 1. params를 await로 가져옵니다.
    const resolvedParams = await params;
    const sessionKey = Number(resolvedParams.session_key);

    if (!sessionKey || Number.isNaN(sessionKey)) {
      return NextResponse.json(
        { error: 'Invalid session_key' },
        { status: 400 },
      );
    }

    // 2. 데이터 가져오기 로직
    let data = await getSessionResult(sessionKey);

    if (!data || data.length === 0) {
      await ensureResultData(sessionKey);
      data = await getSessionResult(sessionKey);
    }

    // 3. 앞서 해결한 BigInt 이슈 방지용 안전한 반환
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
