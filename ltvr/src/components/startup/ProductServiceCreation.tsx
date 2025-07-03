import React, { useState } from "react";
import { supabase } from "../../services/supabaseClient";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { toast } from "sonner";

export function ProductServiceCreation() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Liste de catégories exemple
  const categories = [
    "Web Development",
    "Mobile Apps",
    "Design",
    "Consulting",
    "Autre"
  ];

  // Upload image sur Supabase Storage et retourne l'URL publique
  const uploadImage = async (file: File) => {
    const fileExt = file.name.split('.').pop();
    const filePath = `products/${Date.now()}-${Math.random()}.${fileExt}`;
    const { error } = await supabase.storage.from("products").upload(filePath, file);
    if (error) throw error;
    // Récupérer l'URL publique
    const { data } = supabase.storage.from("products").getPublicUrl(filePath);
    return data.publicUrl;
  };

  // Création du produit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // Vérifier l'utilisateur connecté
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError || !user) throw new Error("Utilisateur non authentifié");

      // Récupérer la startup liée à l'utilisateur
      const { data: startup, error: startupError } = await supabase
        .from("startups")
        .select("id")
        .eq("created_by", user.id)
        .maybeSingle();
      if (startupError || !startup) throw new Error("Startup introuvable pour cet utilisateur");

      // Upload image si présente
      let imageUrl = "";
      if (imageFile) {
        imageUrl = await uploadImage(imageFile);
      }

      // Insert produit
      const { error: insertError } = await supabase.from("products").insert([{
        name,
        description,
        price: parseFloat(price),
        category,
        image_url: imageUrl,
        startup_id: startup.id
      }]);
      if (insertError) throw insertError;

      toast.success("Produit/service créé avec succès !");
      setName(""); setDescription(""); setPrice(""); setCategory(""); setImageFile(null);
    } catch (err: any) {
      toast.error("Erreur : " + (err.message || "inconnue"));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="space-y-4 max-w-lg mx-auto" onSubmit={handleSubmit}>
      <h2 className="text-xl font-bold mb-2">Créer un produit ou service</h2>
      <Input
        placeholder="Nom du produit ou service"
        value={name}
        onChange={e => setName(e.target.value)}
        required
      />
      <Textarea
        placeholder="Description"
        value={description}
        onChange={e => setDescription(e.target.value)}
        required
      />
      <div className="flex gap-4">
        <Input
          placeholder="Prix (€)"
          type="number"
          min="0"
          value={price}
          onChange={e => setPrice(e.target.value)}
          required
        />
        <Select value={category} onValueChange={setCategory} required>
          <SelectTrigger>
            <SelectValue placeholder="Catégorie" />
          </SelectTrigger>
          <SelectContent>
            {categories.map(cat => (
              <SelectItem key={cat} value={cat}>{cat}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <Input
        type="file"
        accept="image/*"
        onChange={e => setImageFile(e.target.files?.[0] || null)}
      />
      {imageFile && (
        <img
          src={URL.createObjectURL(imageFile)}
          alt="Aperçu"
          className="h-24 mt-2 rounded"
        />
      )}
      <Button type="submit" disabled={isLoading}>
        {isLoading ? "Création..." : "Créer"}
      </Button>
    </form>
  );
}