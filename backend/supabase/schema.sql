-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- USERS TABLE (Extends Supabase Auth)
create table public.users (
  id uuid references auth.users not null primary key,
  email text unique,
  username text unique,
  first_name text,
  last_name text,
  photo_url text,
  bio text,
  role text default 'user',
  total_points int default 0,
  problems_solved int default 0,
  current_streak int default 0,
  last_streak_update timestamptz,
  average_accuracy float default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- RLS for Users
alter table public.users enable row level security;
create policy "Public profiles are viewable by everyone" on public.users
  for select using (true);
create policy "Users can update their own profile" on public.users
  for update using (auth.uid() = id);

-- COURSES TABLE
create table public.courses (
  id text primary key, -- Keeping text ID to match Firestore doc IDs (e.g. "c-programming")
  title text not null,
  description text,
  icon text,
  category text,
  difficulty text,
  duration text,
  is_premium boolean default false,
  cover_image text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- COURSE PHASES (Modules)
create table public.course_phases (
  id text primary key, -- Firestore Phase ID
  course_id text references public.courses(id) on delete cascade,
  title text not null,
  "order" int, -- To maintain ordering
  created_at timestamptz default now()
);

-- COURSE TOPICS (Lessons)
create table public.course_topics (
  id text primary key, -- Firestore Topic ID
  course_id text references public.courses(id) on delete cascade,
  phase_id text references public.course_phases(id) on delete cascade,
  title text not null,
  type text default 'content', -- content, quiz, video
  content text, -- Markdown content
  video_url text,
  questions jsonb, -- For quizzes
  diagram text,
  seo_title text,
  seo_description text,
  seo_keywords text[],
  "order" int, 
  created_at timestamptz default now()
);

-- PROBLEMS TABLE
-- Storing problems in DB allows for dynamic updates without redeploying JSON files
create table public.problems (
  id int primary key, -- Using Integer ID as per existing JSON (e.g. 1, 2, 101)
  problem_id int unique, -- Same as ID, kept for compatibility if needed
  title text not null,
  language text default 'javascript',
  difficulty text,
  category text,
  description text, -- problemStatement
  input_format text,
  output_format text,
  examples jsonb,
  test_cases jsonb, -- Array of input/output
  solution_template text,
  hints text[], -- JSON array of strings
  is_course_problem boolean default false,
  created_at timestamptz default now()
);

-- PROGRESS TABLE
create table public.progress (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.users(id) on delete cascade,
  problem_id int references public.problems(id), 
  status text default 'todo', -- todo, attempted, solved
  best_accuracy float default 0,
  time_spent int default 0, -- milliseconds or seconds
  last_submission timestamptz,
  solved_at timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  unique(user_id, problem_id) -- Prevent duplicate progress records
);

alter table public.progress enable row level security;
create policy "Users can view own progress" on public.progress
  for select using (auth.uid() = user_id);
create policy "Users can insert/update own progress" on public.progress
  for all using (auth.uid() = user_id);

-- SUBSCRIPTIONS TABLE
create table public.subscriptions (
  user_id uuid references public.users(id) on delete cascade primary key,
  plan text default 'FREE', -- FREE, PRO, ENTERPRISE
  active boolean default true,
  started_at timestamptz default now(),
  expires_at timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.subscriptions enable row level security;
create policy "Users can view own subscription" on public.subscriptions
  for select using (auth.uid() = user_id);

-- TRIGGERS FOR UPDATED_AT
create or replace function update_updated_at_column()
returns trigger as $$
begin
    new.updated_at = now();
    return new;
end;
$$ language plpgsql;

create trigger update_users_updated_at before update on public.users
for each row execute function update_updated_at_column();

create trigger update_progress_updated_at before update on public.progress
for each row execute function update_updated_at_column();

create trigger update_subscriptions_updated_at before update on public.subscriptions
for each row execute function update_updated_at_column();
