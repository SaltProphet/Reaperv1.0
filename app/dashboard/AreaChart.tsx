"use client"
import { AreaChart, Area, ResponsiveContainer, Tooltip } from 'recharts'

export default function AreaChartComponent({ data }: { data: Array<{ response_time_ms: number, created_at: string }> }) {
  // Fallback for empty data
  if (!data || data.length === 0) {
    return <div className="h-24 flex items-center justify-center text-slate-500">No data</div>
  }

  return (
    <div className="w-full h-24">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 8, right: 0, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorLatency" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <Tooltip
            contentStyle={{ background: '#0f172a', border: 'none', color: '#fff', fontSize: 12 }}
            labelFormatter={v => new Date(v).toLocaleTimeString()}
          />
          <Area
            type="monotone"
            dataKey="response_time_ms"
            stroke="#10b981"
            fill="url(#colorLatency)"
            strokeWidth={2}
            dot={false}
            isAnimationActive={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
