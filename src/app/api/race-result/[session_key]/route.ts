import {
  ensurePitData,
  ensureTeamPitData,
  getPitstopView,
  getTeamPitstopView,
} from '@/lib/server/race_result/pit';
import {
  ensurePositionData,
  getPosition,
} from '@/lib/server/race_result/position';
// import {
//   ensureStartingGridData,
//   getStartingGrid,
// } from '@/lib/server/race_result/starting_grid';
import { ensureRaceControlData } from '@/lib/server/race_result/raceControl';
import { ensureStintsData } from '@/lib/server/race_result/stints';
import {
  ensureWeatherData,
  getWeatherSummary,
} from '@/lib/server/race_result/weather';
import { NextResponse } from 'next/server';
import {
  DriverPositionGain,
  PitView,
  RaceControl,
  Stints,
  TeamPitStopRow,
  WeatherSessionSummary,
} from '@/types/raceResult';
// import { StartingGridWithDriver } from '@/types/meeting';

export type RaceResultResponse = {
  driverPitData: PitView[];
  teamPitData: TeamPitStopRow[];
  positionData: DriverPositionGain[];
  // startingGridData: StartingGridWithDriver[];
  weatherData: WeatherSessionSummary;
  raceControlData: RaceControl[];
  stintsData: Stints[];
};

export async function GET(
  req: Request,
  context: { params: { session_key: string } },
) {
  const sessionKey = Number(context.params.session_key);

  if (!sessionKey || Number.isNaN(sessionKey)) {
    return NextResponse.json({ error: 'Invalid session_key' }, { status: 400 });
  }

  async function handleData<T>(
    getFn: () => Promise<T[]>,
    ensureFn: () => Promise<unknown>,
  ): Promise<T[]> {
    let data = await getFn();

    if (!data || data.length === 0) {
      await ensureFn();
      data = await getFn();
    }

    return data;
  }

  async function handleSingleData<T>(
    getFn: () => Promise<T>,
    ensureFn: () => Promise<unknown>,
  ): Promise<T> {
    let data = await getFn();

    if (!data) {
      await ensureFn();
      data = await getFn();
    }

    return data;
  }

  try {
    const [
      driverPitData,
      teamPitData,
      positionData,
      // startingGridData,
      weatherData,
      raceControlData,
      stintsData,
    ] = await Promise.all([
      handleData(
        () => getPitstopView(sessionKey),
        () => ensurePitData(sessionKey),
      ),
      handleData(
        () => getTeamPitstopView(sessionKey),
        () => ensureTeamPitData(sessionKey),
      ),
      handleData(
        () => getPosition(sessionKey),
        () => ensurePositionData(sessionKey),
      ),
      // handleData(
      //   () => getStartingGrid(sessionKey),
      //   () => ensureStartingGridData(sessionKey),
      // ),
      handleSingleData(
        () => getWeatherSummary(sessionKey),
        () => ensureWeatherData(sessionKey),
      ),
      ensureRaceControlData(sessionKey),
      ensureStintsData(sessionKey),
    ]);

    return NextResponse.json<RaceResultResponse>({
      driverPitData,
      teamPitData,
      positionData,
      // startingGridData,
      weatherData,
      raceControlData,
      stintsData,
    });
  } catch (error) {
    console.error('session-result API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch session result' },
      { status: 500 },
    );
  }
}
