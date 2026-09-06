import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function ActivityChart({ data }) {
  const hasActivity = data.some((d) => d.commits > 0);
  if (!hasActivity) {
    return <p className="empty-note">no public push activity in the last 12 weeks</p>;
  }

  return (
    <ResponsiveContainer width="100%" height={160}>
      <AreaChart data={data} margin={{ left: -20, right: 8, top: 8 }}>
        <defs>
          <linearGradient id="commitFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#5fb37a" stopOpacity={0.35} />
            <stop offset="100%" stopColor="#5fb37a" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis
          dataKey="week"
          tick={{ fill: '#5b6270', fontSize: 11, fontFamily: 'JetBrains Mono' }}
          axisLine={{ stroke: '#2c313c' }}
          tickLine={false}
        />
        <YAxis hide />
        <Tooltip
          contentStyle={{
            background: '#21262f',
            border: '1px solid #2c313c',
            borderRadius: 4,
            fontFamily: 'JetBrains Mono',
            fontSize: 13,
          }}
          labelStyle={{ color: '#e8e6e1' }}
        />
        <Area
          type="monotone"
          dataKey="commits"
          stroke="#5fb37a"
          strokeWidth={2}
          fill="url(#commitFill)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
