-- USERS
create table users (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  password text not null,
  full_name text,
  phone text,
  country text,
  role text check (role in ('client', 'startup', 'structure', 'admin')) not null,
  created_at timestamp with time zone default timezone('utc', now())
);

-- STRUCTURES
create table structures (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  logo_url text,
  structure_type text check (structure_type in ('incubator', 'accelerator', 'fablab')) not null,
  created_by uuid references users(id),
  created_at timestamp with time zone default timezone('utc', now())
);

-- STARTUPS
create table startups (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  logo_url text,
  website text,
  created_by uuid references users(id),
  created_at timestamp with time zone default timezone('utc', now())
);

-- PRODUCTS
create table products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  price numeric not null,
  image_url text,
  startup_id uuid references startups(id),
  created_at timestamp with time zone default timezone('utc', now())
);

-- COMMISSIONS
create table commissions (
  id uuid primary key default gen_random_uuid(),
  startup_id uuid references startups(id),
  structure_id uuid references structures(id),
  percentage numeric default 2.5
);

-- SUPPORT LINKS
create table support_links (
  id uuid primary key default gen_random_uuid(),
  startup_id uuid references startups(id),
  url text,
  label text
);

-- VIP CLUB
create table vip_club (
  id uuid primary key default gen_random_uuid(),
  name text,
  benefits_description text,
  discount_percentage numeric
);

-- VIP CLUB - STARTUPS (many-to-many)
create table vip_club_startups (
  vip_club_id uuid references vip_club(id),
  startup_id uuid references startups(id),
  primary key (vip_club_id, startup_id)
);

-- ORDERS (pour les achats clients)
create table orders (
  id uuid primary key default gen_random_uuid(),
  client_id uuid references users(id),
  product_id uuid references products(id),
  quantity integer default 1,
  total_price numeric,
  status text default 'pending',
  created_at timestamp with time zone default timezone('utc', now())
);

-- Enable RLS
alter table products enable row level security;

-- Policy: startups can manage their products
create policy "Startups can manage their products"
  on products
  for all
  using (startup_id in (select id from startups where created_by = auth.uid()));

-- Policy: everyone can read products
create policy "Public read"
  on products
  for select
  using (true);

-- /api/products.ts
import { supabase } from './supabaseClient';
export default async function handler(req, res) {
  // Authentification
  const token = req.headers.authorization?.split(' ')[1];
  const { user } = await supabase.auth.getUser(token);
  if (!user) return res.status(401).json({ error: 'Unauthorized' });

  if (req.method === 'GET') {
    -- RBAC: clients et startups peuvent lire
    const { data, error } = await supabase.from('products').select('*');
    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json(data);
  }
  if (req.method === 'POST') {
    -- RBAC: seuls les startups peuvent créer
    if (user.role !== 'startup') return res.status(403).json({ error: 'Forbidden' });
    -- ... création produit
  }
}