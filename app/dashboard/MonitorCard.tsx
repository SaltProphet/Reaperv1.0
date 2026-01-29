"use client";
import { FC } from "react";
import { LineChart, Line, ResponsiveContainer } from "recharts";

interface MonitorCardProps {
  id: string;
  url: string;
  status: "up" | "down";
  latency: number[];
}

const statusColor = {
  up: "bg-emerald-500",
  down: "bg-rose-500",
};

const MonitorCard: FC<MonitorCardProps> = ({ id, url, status, latency }) => {
  return (
    <div className="bg-slate-900 rounded-lg p-6 shadow flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <span className={`h-3 w-3 rounded-full ${statusColor[status]}`}></span>
        <span className="font-semibold text-lg truncate">{url}</span>
      </div>
      <div className="h-12">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={latency.map((v, i) => ({ i, v }))}>
            <Line
              type="monotone"
              dataKey="v"
              stroke="#10b981" // emerald-500
              dot={false}
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="text-xs text-slate-400">Latency Sparkline (ms)</div>
    </div>
  );
};

export default MonitorCard;
