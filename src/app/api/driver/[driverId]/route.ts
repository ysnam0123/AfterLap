import { fetchDriverData } from '@/lib/server/detailPage/driverDetail';
import { NextResponse } from 'next/server';

export async function GET(
  req: Request,
  { params }: { params: Promise<{ driverId: string }> },
) {
  const { driverId } = await params;
  const id = Number(driverId);

  if (!id) {
    return NextResponse.json({ error: 'invalid driver_id' }, { status: 400 });
  }

  const data = await fetchDriverData(id);
  return NextResponse.json(data);
}
