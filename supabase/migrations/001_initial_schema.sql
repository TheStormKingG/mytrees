-- ================================================
-- MyTrees — Initial Database Schema
-- ================================================

-- Enable UUID generation
create extension if not exists "pgcrypto";

-- ------------------------------------------------
-- profiles
-- ------------------------------------------------
create table if not exists public.profiles (
  id           uuid primary key references auth.users(id) on delete cascade,
  username     text unique,
  xp           integer not null default 0,
  level        integer not null default 1,
  streak_days  integer not null default 0,
  streak_last_date date,
  avatar_url   text,
  school_group text,
  created_at   timestamptz not null default now()
);

-- Auto-create a profile on new user signup
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer as $$
begin
  insert into public.profiles (id)
  values (new.id)
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ------------------------------------------------
-- species
-- ------------------------------------------------
create table if not exists public.species (
  id                      uuid primary key default gen_random_uuid(),
  name                    text not null,
  scientific_name         text,
  category                text not null default 'native'
                            check (category in ('native', 'non-native', 'invasive')),
  carbon_coeff_kg_per_cm  numeric not null default 1.5,
  created_at              timestamptz not null default now()
);

-- Seed common species
insert into public.species (name, scientific_name, category, carbon_coeff_kg_per_cm) values
  ('Mango',           'Mangifera indica',       'non-native', 2.1),
  ('Moringa',         'Moringa oleifera',        'native',     1.8),
  ('African Mahogany','Khaya senegalensis',      'native',     3.2),
  ('Neem',            'Azadirachta indica',      'non-native', 2.4),
  ('Shea',            'Vitellaria paradoxa',     'native',     2.8),
  ('Baobab',          'Adansonia digitata',      'native',     4.5),
  ('Eucalyptus',      'Eucalyptus globulus',     'invasive',   3.6),
  ('Acacia',          'Acacia senegal',          'native',     2.0),
  ('Banana',          'Musa acuminata',          'non-native', 0.9),
  ('Coconut',         'Cocos nucifera',          'non-native', 1.6)
on conflict do nothing;

-- ------------------------------------------------
-- trees
-- ------------------------------------------------
create table if not exists public.trees (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references public.profiles(id) on delete cascade,
  name        text not null,
  species_id  uuid references public.species(id) on delete set null,
  lat         double precision,
  lng         double precision,
  planted_at  date,
  stage       text not null default 'seed'
                check (stage in ('seed', 'seedling', 'sapling', 'tree')),
  is_public   boolean not null default true,
  notes       text,
  created_at  timestamptz not null default now()
);

create index if not exists trees_user_id_idx on public.trees(user_id);

-- ------------------------------------------------
-- tree_logs
-- ------------------------------------------------
create table if not exists public.tree_logs (
  id          uuid primary key default gen_random_uuid(),
  tree_id     uuid not null references public.trees(id) on delete cascade,
  logged_at   timestamptz not null default now(),
  height_cm   numeric,
  canopy_cm   numeric,
  health      text not null default 'good'
                check (health in ('excellent', 'good', 'fair', 'poor')),
  notes       text,
  photo_url   text,
  xp_awarded  integer not null default 0,
  created_at  timestamptz not null default now()
);

create index if not exists tree_logs_tree_id_idx on public.tree_logs(tree_id);

-- ------------------------------------------------
-- award_xp function
-- ------------------------------------------------
create or replace function public.award_xp(user_id uuid, amount integer)
returns void language plpgsql security definer as $$
declare
  new_xp integer;
begin
  update public.profiles
  set
    xp    = xp + amount,
    level = floor((xp + amount) / 500) + 1
  where id = user_id
  returning xp into new_xp;
end;
$$;

-- ------------------------------------------------
-- Row-Level Security
-- ------------------------------------------------
alter table public.profiles   enable row level security;
alter table public.trees      enable row level security;
alter table public.tree_logs  enable row level security;
alter table public.species    enable row level security;

-- profiles: users can read all, edit only their own
create policy "Profiles are publicly readable"
  on public.profiles for select using (true);
create policy "Users can update own profile"
  on public.profiles for update using (auth.uid() = id);
create policy "Users can insert own profile"
  on public.profiles for insert with check (auth.uid() = id);

-- trees: public trees readable by all, private only by owner
create policy "Public trees are visible to all"
  on public.trees for select using (is_public = true or auth.uid() = user_id);
create policy "Users can insert own trees"
  on public.trees for insert with check (auth.uid() = user_id);
create policy "Users can update own trees"
  on public.trees for update using (auth.uid() = user_id);
create policy "Users can delete own trees"
  on public.trees for delete using (auth.uid() = user_id);

-- tree_logs: readable if tree is public or owned
create policy "Tree logs visible if tree is public or owner"
  on public.tree_logs for select
  using (exists (
    select 1 from public.trees t
    where t.id = tree_id
      and (t.is_public = true or t.user_id = auth.uid())
  ));
create policy "Users can insert logs on own trees"
  on public.tree_logs for insert
  with check (exists (
    select 1 from public.trees t
    where t.id = tree_id and t.user_id = auth.uid()
  ));

-- species: readable by everyone
create policy "Species readable by all"
  on public.species for select using (true);
