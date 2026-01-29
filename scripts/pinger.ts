import 'dotenv/config';
import axios from 'axios';
import { adminSupabase } from '../lib/supabase/admin.js';
import type { Monitor } from '../types/database.js';

async function main() {
  // Fetch all active monitors
  const { data: monitors, error } = await adminSupabase
    .from('monitors')
    .select('*')
    .eq('is_active', true);

  if (error) {
    console.error('Error fetching monitors:', error);
    process.exit(1);
  }

  if (!monitors || monitors.length === 0) {
    console.log('No active monitors found.');
    return;
  }

  const results = await Promise.allSettled(
    (monitors as Monitor[]).map(async (monitor) => {
      const start = Date.now();
      let status_code: number | null = null;
      let latency_ms: number | null = null;
      try {
        const response = await axios({
          url: monitor.url,
          method: monitor.method as any,
          timeout: 10000,
        });
        status_code = response.status;
        latency_ms = Date.now() - start;
      } catch (err: any) {
        status_code = err?.response?.status || null;
        latency_ms = Date.now() - start;
      }
      return {
        monitor_id: monitor.id,
        status_code,
        latency_ms,
      };
    })
  );

  // Prepare successful results for batch insert
  const logs = results
    .filter(r => r.status === 'fulfilled')
    .map(r => (r as PromiseFulfilledResult<any>).value);

  if (logs.length > 0) {
    const { error: insertError } = await adminSupabase
      .from('logs')
      .insert(logs);
    if (insertError) {
      console.error('Error inserting logs:', insertError);
      process.exit(1);
    }
    console.log(`Inserted ${logs.length} log(s).`);
  } else {
    console.log('No logs to insert.');
  }
}

main().catch((err) => {
  console.error('Worker failed:', err);
  process.exit(1);
});
