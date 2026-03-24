import { fetchTeamData } from '@/lib/server/detailPage/teamDetail';
import { NextResponse } from 'next/server';

export async function GET(
  req: Request,
  { params }: { params: Promise<{ teamSlug: string }> },
) {
  // 1. params를 await로 기다린 후, 내부의 teamSlug를 꺼내옵니다.
  const { teamSlug } = await params;

  // 2. 값이 비어있는지 체크 (resolved된 문자열인지 확인)
  if (!teamSlug) {
    return NextResponse.json({ error: 'invalid team_slug' }, { status: 400 });
  }

  // 3. 이제 'string' 타입인 teamSlug를 전달합니다.
  const data = await fetchTeamData(teamSlug);

  // BigInt 대응 (필요시 추가)
  const safeData = JSON.parse(
    JSON.stringify(data, (key, value) =>
      typeof value === 'bigint' ? value.toString() : value,
    ),
  );

  return NextResponse.json(safeData);
}
