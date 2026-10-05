create table if not exists profiles (
  id text primary key,
  user_id text not null unique,
  name text not null,
  avatar_key text not null default 'orbit',
  avatar_url text,
  bio text not null default '',
  availability text not null default 'available',
  experience_years int not null default 0,
  onboarding_complete boolean not null default false,
  is_seed boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists profile_skills (
  id text primary key,
  profile_id text not null references profiles(id) on delete cascade,
  name text not null,
  domain text not null default '',
  confidence text not null default 'self_declared'
);

create table if not exists profile_domains (
  id text primary key,
  profile_id text not null references profiles(id) on delete cascade,
  name text not null
);

create table if not exists profile_interests (
  id text primary key,
  profile_id text not null references profiles(id) on delete cascade,
  name text not null
);

create table if not exists past_projects (
  id text primary key,
  profile_id text not null references profiles(id) on delete cascade,
  title text not null,
  description text not null default '',
  skills_json text not null default '[]',
  year int not null default 2024
);

create table if not exists evidence (
  id text primary key,
  profile_id text not null references profiles(id) on delete cascade,
  skill_name text not null,
  type text not null,
  title text not null,
  detail text not null default '',
  status text not null default 'evidence_supported'
);

create table if not exists ideas (
  id text primary key,
  owner_id text not null,
  title text not null,
  description text not null,
  domain_hint text not null default '',
  constraints_text text not null default '',
  timeline text not null default '',
  availability_need text not null default '',
  status text not null default 'analyzed',
  analysis_json text not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists idea_requirements (
  id text primary key,
  idea_id text not null references ideas(id) on delete cascade,
  role text not null,
  skills_json text not null default '[]',
  priority text not null default 'medium',
  reason text not null default '',
  hidden boolean not null default false
);

create table if not exists idea_members (
  id text primary key,
  idea_id text not null references ideas(id) on delete cascade,
  profile_id text not null references profiles(id) on delete cascade,
  role text not null,
  source text not null,
  unique (idea_id, profile_id)
);

create table if not exists collab_requests (
  id text primary key,
  idea_id text not null references ideas(id) on delete cascade,
  sender_id text not null,
  receiver_id text not null,
  role text not null,
  requirement_id text,
  status text not null default 'pending',
  created_at timestamptz not null default now()
);

create table if not exists tasks (
  id text primary key,
  idea_id text not null references ideas(id) on delete cascade,
  title text not null,
  assignee_id text,
  status text not null default 'todo',
  created_at timestamptz not null default now()
);

create index if not exists ideas_owner_idx on ideas (owner_id);
create index if not exists idea_members_idea_idx on idea_members (idea_id);
create index if not exists collab_receiver_idx on collab_requests (receiver_id);
create index if not exists collab_sender_idx on collab_requests (sender_id);
create index if not exists tasks_idea_idx on tasks (idea_id);
