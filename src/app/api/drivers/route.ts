import { ensureDriverData } from '@/lib/server/drivers';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const sessionKeyParam = searchParams.get('session_key');

    if (!sessionKeyParam) {
      return NextResponse.json(
        { error: 'session_key is required' },
        { status: 400 },
      );
    }

    const sessionKey = Number(sessionKeyParam);

    // 이제 data는 void가 아니라 드라이버 배열을 반환합니다.
    const data = await ensureDriverData(sessionKey);

    if (!data || data.length === 0) {
      return NextResponse.json([], { status: 200 }); // 빈 배열이라도 안전하게 반환
    }

    // BigInt 처리 포함 (Supabase ID나 키 값이 BigInt일 확률이 높음)
    const safeData = JSON.parse(
      JSON.stringify(data, (key, value) =>
        typeof value === 'bigint' ? value.toString() : value,
      ),
    );

    return NextResponse.json(safeData);
  } catch (err) {
    console.error('🔥 drivers API error:', err);
    return NextResponse.json(
      { error: 'internal server error' },
      { status: 500 },
    );
  }
}
