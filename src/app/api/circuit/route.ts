import { NextResponse } from 'next/server';
import { fetchCircuits, fetchCircuit } from '@/lib/server/circuit';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const circuitKey = searchParams.get('circuit_key');

  if (circuitKey) {
    const data = await fetchCircuit(Number(circuitKey));
    return NextResponse.json(data);
  }

  const data = await fetchCircuits();
  return NextResponse.json(data);
}
