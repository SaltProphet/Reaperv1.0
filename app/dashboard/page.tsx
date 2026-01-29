// Dashboard page using Next.js 15 patterns
import { cookies, headers } from 'next/headers';
import AreaChart from './AreaChart';
import MonitorCard from './MonitorCard';
import RefreshButton from './RefreshButton';

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
  // Await cookies and headers as per Next.js 15 rules
  const cookieStore = await cookies();
  const headerList = await headers();

  // TODO: Fetch monitor data and latency trends here
  const monitors = [];
  const latencyData = [];

  return (
    <main className="min-h-screen bg-slate-950 text-white p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <RefreshButton />
      </div>
      <section className="mb-8">
        <AreaChart data={latencyData} />
      </section>
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {monitors.map((monitor) => (
          <MonitorCard key={monitor.id} {...monitor} />
        ))}
      </section>
    </main>
  );
}
