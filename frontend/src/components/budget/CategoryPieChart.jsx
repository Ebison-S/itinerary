import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { formatCurrency } from '../../utils/currencyHelpers';

const COLORS = ['#FF6B4A', '#F2B705', '#1F8A70', '#E14F30', '#9C9294'];
const LABELS = {
  accommodation: 'Accommodation',
  transport: 'Transport',
  food: 'Food',
  activities: 'Activities',
  misc: 'Misc',
};

export default function CategoryPieChart({ breakdown, currency }) {
  const data = Object.entries(breakdown)
    .map(([key, val]) => ({ name: LABELS[key] || key, value: val.spent }))
    .filter((d) => d.value > 0);

  if (data.length === 0) {
    return (
      <div className="card p-6 flex items-center justify-center h-64">
        <p className="text-sm text-ink-faint">No expenses logged yet</p>
      </div>
    );
  }

  return (
    <div className="card p-6">
      <p className="data-mono mb-3">By category</p>
      <ResponsiveContainer width="100%" height={220}>
        <PieChart>
          <Pie data={data} dataKey="value" nameKey="name" innerRadius={55} outerRadius={85} paddingAngle={4}>
            {data.map((_, i) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} stroke="none" />
            ))}
          </Pie>
          <Tooltip
            formatter={(value) => formatCurrency(value, currency)}
            contentStyle={{
              background: '#201C1D',
              border: 'none',
              borderRadius: 16,
              fontSize: 13,
              fontWeight: 600,
            }}
            itemStyle={{ color: '#FBF6EF' }}
          />
        </PieChart>
      </ResponsiveContainer>
      <div className="grid grid-cols-2 gap-2.5 mt-3">
        {data.map((d, i) => (
          <div key={d.name} className="flex items-center gap-2 text-xs font-bold">
            <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: COLORS[i % COLORS.length] }} />
            <span className="text-ink-soft truncate">{d.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}