import { fetchDriverData } from '@/lib/server/detailPage/driverDetail';
import { NextResponse } from 'next/server';

export async function GET(
  req: Request,
  { params }: { params: { driverId: string } },
) {
  const driverId = Number(params.driverId);

  if (!driverId) {
    return NextResponse.json({ error: 'invalid driver_id' }, { status: 400 });
  }

  const data = await fetchDriverData(driverId);
  return NextResponse.json(data);
}
