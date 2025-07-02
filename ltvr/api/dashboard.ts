import type { VercelRequest, VercelResponse } from '@vercel/node';
import { supabase } from './supabaseClient';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const token = req.headers.authorization?.split(' ')[1];
  const { data: { user } } = await supabase.auth.getUser(token);
  if (!user) return res.status(401).json({ error: 'Unauthorized' });
  const role = user.user_metadata.role;

  if (role === 'admin') {
    // KPIs admin
    const [{ count: userCount }, { count: startupCount }, { count: productCount }] = await Promise.all([
      supabase.from('users').select('*', { count: 'exact', head: true }),
      supabase.from('startups').select('*', { count: 'exact', head: true }),
      supabase.from('products').select('*', { count: 'exact', head: true })
    ]);
    return res.status(200).json({ userCount, startupCount, productCount });
  }
  if (role === 'startup') {
    // KPIs startup
    const { data: startup } = await supabase.from('startups').select('id').eq('created_by', user.id).single();
    if (!startup) return res.status(400).json({ error: 'Startup introuvable' });
    const [{ count: productCount }, { count: orderCount }] = await Promise.all([
      supabase.from('products').select('*', { count: 'exact', head: true }).eq('startup_id', startup.id),
      supabase.from('orders').select('*', { count: 'exact', head: true }).eq('product_id', startup.id)
    ]);
    return res.status(200).json({ productCount, orderCount });
  }
  if (role === 'structure') {
    // KPIs structure
    const { data: startups } = await supabase.from('startups').select('id').eq('created_by', user.id);
    return res.status(200).json({ supportedStartups: startups.length });
  }
  if (role === 'client') {
    // KPIs client
    const { data: orders } = await supabase.from('orders').select('*').eq('client_id', user.id);
    return res.status(200).json({ orderHistory: orders });
  }
  res.status(403).json({ error: 'Role inconnu' });
}
