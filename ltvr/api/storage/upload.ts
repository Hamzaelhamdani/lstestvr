import type { VercelRequest, VercelResponse } from '@vercel/node';
import { supabase } from '../supabaseClient';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Méthode non autorisée' });
  const token = req.headers.authorization?.split(' ')[1];
  const { data: { user } } = await supabase.auth.getUser(token);
  if (!user) return res.status(401).json({ error: 'Unauthorized' });

  // Utilisez formidable ou busboy pour parser le fichier (exemple simplifié)
  // Ici, on suppose que le fichier est dans req.body.file (à adapter selon votre frontend)
  const { file, bucket = 'public' } = req.body;
  if (!file) return res.status(400).json({ error: 'Aucun fichier fourni' });
  const { data, error } = await supabase.storage.from(bucket).upload(`uploads/${file.name}`, file, { upsert: true });
  if (error) return res.status(400).json({ error: error.message });
  return res.status(201).json({ url: data.path });
}
