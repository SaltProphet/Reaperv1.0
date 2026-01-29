-- Table: monitors
create table if not exists monitors (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users not null,
  name text not null,
  url text not null,
  method text default 'GET',
  is_active boolean default true,
  created_at timestamptz default now()
);

-- Table: logs
create table if not exists logs (
  id bigint primary key generated always as identity,
  monitor_id uuid references monitors on delete cascade,
  status_code integer,
  latency_ms integer,
  timestamp timestamptz default now()
);

-- Enable RLS
alter table monitors enable row level security;
alter table logs enable row level security;

-- RLS Policies for monitors
create policy "Users can manage their own monitors" on monitors
  for all using (user_id = auth.uid());

-- RLS Policies for logs
create policy "Users can view logs for their monitors" on logs
  for select using (exists (
    select 1 from monitors m where m.id = logs.monitor_id and m.user_id = auth.uid()
  ));
