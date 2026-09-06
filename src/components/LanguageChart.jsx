import { BarChart, Bar, XAxis, YAxis, Tooltip, Cell, ResponsiveContainer } from 'recharts';

const PALETTE = ['#d9a441', '#5fb37a', '#7fa8d9', '#c98fd9', '#d9705f', '#6fc4c4'];

export default function LanguageChart({ data }) {
  if (!data.length) {
    return <p className="empty-note">no language data in recent repos</p>;
  }

  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={data} layout="vertical" margin={{ left: 8, right: 24 }}>
        <XAxis type="number" hide />
        <YAxis
          dataKey="name"
          type="category"
          width={90}
          tick={{ fill: '#8b92a0', fontSize: 13, fontFamily: 'JetBrains Mono' }}
          axisLine={{ stroke: '#2c313c' }}
          tickLine={false}
        />
        <Tooltip
          cursor={{ fill: 'rgba(255,255,255,0.03)' }}
          contentStyle={{
            background: '#21262f',
            border: '1px solid #2c313c',
            borderRadius: 4,
            fontFamily: 'JetBrains Mono',
            fontSize: 13,
          }}
          labelStyle={{ color: '#e8e6e1' }}
        />
        <Bar dataKey="value" radius={[0, 3, 3, 0]} barSize={14}>
          {data.map((_, i) => (
            <Cell key={i} fill={PALETTE[i % PALETTE.length]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
