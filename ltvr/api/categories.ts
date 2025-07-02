import type { VercelRequest, VercelResponse } from '@vercel/node';
import { supabase } from './supabaseClient';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const token = req.headers.authorization?.split(' ')[1];
  const { data: { user } } = await supabase.auth.getUser(token);
  if (!user) return res.status(401).json({ error: 'Unauthorized' });

  if (req.method === 'GET') {
    const { data, error } = await supabase.from('categories').select('*');
    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json(data);
  }
  if (req.method === 'POST') {
    if (user.user_metadata.role !== 'admin' && user.user_metadata.role !== 'startup') return res.status(403).json({ error: 'Forbidden' });
    const { name } = req.body;
    const { data, error } = await supabase.from('categories').insert([{ name }]).select().single();
    if (error) return res.status(400).json({ error: error.message });
    return res.status(201).json(data);
  }
  res.status(405).json({ error: 'Méthode non autorisée' });
}
