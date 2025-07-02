import type { VercelRequest, VercelResponse } from '@vercel/node';
import { supabase } from './supabaseClient';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'GET') {
    // Exemple : récupérer tous les produits
    const { data, error } = await supabase.from('products').select('*');
    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json(data);
  }
  if (req.method === 'POST') {
    // Exemple : ajouter un produit
    const { name, description, price } = req.body;
    const { data, error } = await supabase.from('products').insert([{ name, description, price }]);
    if (error) return res.status(500).json({ error: error.message });
    return res.status(201).json(data);
  }
  res.status(405).json({ error: 'Méthode non autorisée' });
}
