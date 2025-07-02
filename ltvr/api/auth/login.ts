import type { VercelRequest, VercelResponse } from '@vercel/node';
import { supabase } from '../supabaseClient';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Méthode non autorisée' });
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Champs obligatoires manquants' });
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) return res.status(401).json({ error: error.message });
  return res.status(200).json({ session: data.session, user: data.user });
}
