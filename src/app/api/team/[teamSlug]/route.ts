import { fetchTeamData } from '@/lib/server/detailPage/teamDetail';
import { NextResponse } from 'next/server';

export async function GET(
  req: Request,
  context: { params: { teamSlug: string } },
) {
  const teamSlug = context.params.teamSlug;

  if (!teamSlug) {
    return NextResponse.json({ error: 'invalid team_slug' }, { status: 400 });
  }

  const data = await fetchTeamData(teamSlug);
  return NextResponse.json(data);
}
