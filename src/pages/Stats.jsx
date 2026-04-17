import { useMemo } from 'react';
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts';
import { useTimeline } from '../context/TimelineContext';

const COLORS = { call: '#2d5a4e', text: '#7c5cbf', video: '#4caf7d', meetup: '#f5a623' };

const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
  if (percent < 0.05) return null;
  const RADIAN = Math.PI / 180;
  const r = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + r * Math.cos(-midAngle * RADIAN);
  const y = cy + r * Math.sin(-midAngle * RADIAN);
  return (
    <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize={12} fontWeight={700}>
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export default function Stats() {
  const { timeline } = useTimeline();

  const chartData = useMemo(() => {
    const counts = { call: 0, text: 0, video: 0 };
    timeline.forEach((e) => {
      if (e.type in counts) counts[e.type]++;
    });
    return Object.entries(counts)
      .filter(([, v]) => v > 0)
      .map(([name, value]) => ({ name: name.charAt(0).toUpperCase() + name.slice(1), value, key: name }));
  }, [timeline]);

  const total = chartData.reduce((s, d) => s + d.value, 0);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Friendship Analytics</h1>

      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <h2 className="text-base font-semibold text-gray-700 mb-6">By Interaction Type</h2>

        <ResponsiveContainer width="100%" height={320}>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={80}
              outerRadius={130}
              paddingAngle={3}
              dataKey="value"
              labelLine={false}
              label={renderCustomLabel}
            >
              {chartData.map((entry) => (
                <Cell key={entry.key} fill={COLORS[entry.key] ?? '#999'} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value, name) => [`${value} (${((value / total) * 100).toFixed(1)}%)`, name]}
              contentStyle={{ borderRadius: '12px', border: '1px solid #e5e7eb', fontSize: '13px' }}
            />
            <Legend
              iconType="circle"
              iconSize={8}
              formatter={(value) => <span style={{ fontSize: '13px', color: '#4b5563' }}>{value}</span>}
            />
          </PieChart>
        </ResponsiveContainer>

        {/* Summary row */}
        <div className="mt-4 grid grid-cols-3 gap-3 border-t border-gray-100 pt-5">
          {chartData.map((d) => (
            <div key={d.key} className="text-center">
              <div
                className="w-8 h-8 rounded-full mx-auto mb-1.5 flex items-center justify-center"
                style={{ backgroundColor: `${COLORS[d.key]}20` }}
              >
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[d.key] }} />
              </div>
              <p className="text-xl font-bold text-gray-900">{d.value}</p>
              <p className="text-xs text-gray-500">{d.name}s</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
