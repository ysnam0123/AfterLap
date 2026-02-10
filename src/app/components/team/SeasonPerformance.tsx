import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

export interface TeamPerformanceData {
  flag: string | null;
  race: string;
  round: number;
  points: number;
  position: string | null;
  cumulativePoints: number;
  race_kr_name: string;
}

interface SeasonPerformanceProps {
  data: TeamPerformanceData[];
  teamColor: string;
}

export function SeasonPerformance({ data, teamColor }: SeasonPerformanceProps) {
  return (
    <div className="border-t border-neutral-800 py-12 select-none">
      <h2 className="mb-8 text-2xl font-semibold tracking-tight">
        시즌 퍼포먼스
      </h2>
      <div className="border border-neutral-800 bg-[#111] p-6">
        <div className="mb-4">
          <p className="text-[20px] tracking-wider text-neutral-500 uppercase">
            라운드 별 포인트
          </p>
        </div>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
            <XAxis
              dataKey="round"
              stroke="#666"
              tick={{ fill: '#999', fontSize: 12 }}
              label={{
                value: 'Round',
                position: 'insideBottom',
                offset: -5,
                fill: '#666',
              }}
            />
            <YAxis
              stroke="#666"
              tick={{ fill: '#999', fontSize: 12 }}
              label={{
                value: 'Points',
                angle: -90,
                position: 'insideLeft',
                fill: '#666',
              }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1a1a1a',
                border: '0px solid #333',
                borderRadius: '4px',
                color: '#fff',
              }}
              labelStyle={{ color: '#999' }}
              formatter={(value, name) => {
                if (name === 'cumulativePoints') {
                  return [`${value} pts`, '누적 포인트'];
                }
                return [value, name];
              }}
              labelFormatter={(label) => `Round ${label}`}
            />
            <Line
              type="monotone"
              dataKey="cumulativePoints"
              stroke={teamColor}
              strokeWidth={2}
              dot={{ fill: teamColor, r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
