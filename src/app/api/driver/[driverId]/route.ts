import { fetchDriverData } from '@/lib/server/detailPage/driverDetail';
import { NextResponse } from 'next/server';

export async function GET(
  req: Request,
  { params }: { params: Promise<{ driver_id: string }> },
) {
  const driver_id = await params;
  const driverId = Number(driver_id);

  if (!driverId) {
    return NextResponse.json({ error: 'invalid driver_id' }, { status: 400 });
  }

  const data = await fetchDriverData(driverId);
  return NextResponse.json(data);
}
