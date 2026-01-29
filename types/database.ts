export type Monitor = {
  id: string;
  user_id: string;
  name: string;
  url: string;
  method: string;
  is_active: boolean;
  created_at: string;
};

export type Log = {
  id: number;
  monitor_id: string;
  status_code: number | null;
  latency_ms: number | null;
  timestamp: string;
};
