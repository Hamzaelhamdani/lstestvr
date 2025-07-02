-- USERS : chaque utilisateur ne peut voir que ses propres infos, admin voit tout
alter table users enable row level security;
create policy "Users can view their own profile" on users
  for select using (auth.uid() = id);
create policy "Admins can view all users" on users
  for select using (exists (select 1 from users u where u.id = auth.uid() and u.role = 'admin'));

-- STRUCTURES : admin voit tout, structure voit ce qu’il a créé
alter table structures enable row level security;
create policy "Admins can manage all structures" on structures
  for all using (exists (select 1 from users u where u.id = auth.uid() and u.role = 'admin'));
create policy "Structure can manage their own" on structures
  for all using (created_by = auth.uid());

-- STARTUPS : admin voit tout, startup voit ce qu’il a créé
alter table startups enable row level security;
create policy "Admins can manage all startups" on startups
  for all using (exists (select 1 from users u where u.id = auth.uid() and u.role = 'admin'));
create policy "Startup can manage their own" on startups
  for all using (created_by = auth.uid());

-- PRODUCTS : admin voit tout, startup gère ses produits, tout le monde peut lire
alter table products enable row level security;
create policy "Admins can manage all products" on products
  for all using (exists (select 1 from users u where u.id = auth.uid() and u.role = 'admin'));
create policy "Startup can manage their products" on products
  for all using (startup_id in (select id from startups where created_by = auth.uid()));
create policy "Public can read products" on products
  for select using (true);

-- TEAM MEMBERS : admin/startup gèrent leur équipe, tout le monde peut lire
alter table team_members enable row level security;
create policy "Admins can manage all team members" on team_members
  for all using (exists (select 1 from users u where u.id = auth.uid() and u.role = 'admin'));
create policy "Startup can manage their team" on team_members
  for all using (startup_id in (select id from startups where created_by = auth.uid()));
create policy "Public can read team members" on team_members
  for select using (true);

-- CATEGORIES : admin/startup peuvent créer, tout le monde peut lire
alter table categories enable row level security;
create policy "Admins and startups can insert categories" on categories
  for insert using (exists (select 1 from users u where u.id = auth.uid() and (u.role = 'admin' or u.role = 'startup')));
create policy "Public can read categories" on categories
  for select using (true);

-- STARTUP_CATEGORIES : admin/startup gèrent, tout le monde peut lire
alter table startup_categories enable row level security;
create policy "Admins and startups can manage startup_categories" on startup_categories
  for all using (exists (select 1 from users u where u.id = auth.uid() and (u.role = 'admin' or u.role = 'startup')));
create policy "Public can read startup_categories" on startup_categories
  for select using (true);

-- STARTUP_SOCIALS : admin/startup gèrent, tout le monde peut lire
alter table startup_socials enable row level security;
create policy "Admins and startups can manage socials" on startup_socials
  for all using (exists (select 1 from users u where u.id = auth.uid() and (u.role = 'admin' or u.role = 'startup')));
create policy "Public can read socials" on startup_socials
  for select using (true);

-- COMMISSIONS : admin gère tout, structure voit ses commissions
alter table commissions enable row level security;
create policy "Admins can manage all commissions" on commissions
  for all using (exists (select 1 from users u where u.id = auth.uid() and u.role = 'admin'));
create policy "Structure can view their commissions" on commissions
  for select using (structure_id in (select id from structures where created_by = auth.uid()));

-- SUPPORT_LINKS : admin/startup gèrent, tout le monde peut lire
alter table support_links enable row level security;
create policy "Admins and startups can manage support_links" on support_links
  for all using (exists (select 1 from users u where u.id = auth.uid() and (u.role = 'admin' or u.role = 'startup')));
create policy "Public can read support_links" on support_links
  for select using (true);

-- VIP CLUB : admin gère, tout le monde peut lire
alter table vip_club enable row level security;
create policy "Admins can manage vip_club" on vip_club
  for all using (exists (select 1 from users u where u.id = auth.uid() and u.role = 'admin'));
create policy "Public can read vip_club" on vip_club
  for select using (true);

-- VIP_CLUB_STARTUPS : admin gère, tout le monde peut lire
alter table vip_club_startups enable row level security;
create policy "Admins can manage vip_club_startups" on vip_club_startups
  for all using (exists (select 1 from users u where u.id = auth.uid() and u.role = 'admin'));
create policy "Public can read vip_club_startups" on vip_club_startups
  for select using (true);

-- ORDERS : admin voit tout, client voit ses commandes
alter table orders enable row level security;
create policy "Admins can manage all orders" on orders
  for all using (exists (select 1 from users u where u.id = auth.uid() and u.role = 'admin'));
create policy "Client can manage their orders" on orders
  for all using (client_id = auth.uid());

-- REVIEWS : admin gère tout, client gère ses avis, tout le monde peut lire
alter table reviews enable row level security;
create policy "Admins can manage all reviews" on reviews
  for all using (exists (select 1 from users u where u.id = auth.uid() and u.role = 'admin'));
create policy "Client can manage their reviews" on reviews
  for all using (user_id = auth.uid());
create policy "Public can read reviews" on reviews
  for select using (true);