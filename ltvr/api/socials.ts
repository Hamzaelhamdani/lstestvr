import type { VercelRequest, VercelResponse } from '@vercel/node';
import { supabase } from './supabaseClient';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const token = req.headers.authorization?.split(' ')[1];
  const { data: { user } } = await supabase.auth.getUser(token);
  if (!user) return res.status(401).json({ error: 'Unauthorized' });

  if (req.method === 'GET') {
    const { startup_id } = req.query;
    let query = supabase.from('startup_socials').select('*');
    if (startup_id) query = query.eq('startup_id', startup_id);
    const { data, error } = await query;
    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json(data);
  }
  if (req.method === 'POST') {
    if (user.user_metadata.role !== 'startup') return res.status(403).json({ error: 'Forbidden' });
    const { startup_id, name, url } = req.body;
    const { data, error } = await supabase.from('startup_socials').insert([{ startup_id, name, url }]).select().single();
    if (error) return res.status(400).json({ error: error.message });
    return res.status(201).json(data);
  }
  res.status(405).json({ error: 'Méthode non autorisée' });
}
