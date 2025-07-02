import type { VercelRequest, VercelResponse } from '@vercel/node';
import { supabase } from '../supabaseClient';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Méthode non autorisée' });
  const { email, password, full_name, phone, country, role } = req.body;
  if (!email || !password || !role) return res.status(400).json({ error: 'Champs obligatoires manquants' });
  const { data, error } = await supabase.auth.admin.createUser({
    email,
    password,
    user_metadata: { full_name, phone, country, role },
  });
  if (error) return res.status(400).json({ error: error.message });
  return res.status(201).json({ user: data.user });
}
