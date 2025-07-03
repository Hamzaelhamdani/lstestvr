# VenturesRoom

VenturesRoom est une plateforme en ligne qui connecte startups, clients, structures d’accompagnement (incubateurs, accélérateurs, fablabs) et administrateurs. Elle permet aux startups de présenter, promouvoir et vendre leurs produits ou services innovants, tout en offrant un modèle unique de partage de commissions.

## 🧠 Description

- **Startups** : Créent un profil, ajoutent des produits/services, accèdent à des dashboards et reçoivent du support.
- **Clients** : Parcourent et achètent des produits/services.
- **Structures** : Soutiennent les startups et reçoivent une part des commissions sur les ventes.
- **Admins** : Gèrent l’ensemble de la plateforme.

## 💸 Modèle de commission

- 5% de commission sur chaque vente.
- Si une structure accompagne la startup, 2,5% pour la plateforme et 2,5% pour la/les structure(s).
- Si plusieurs structures, la part structure est répartie équitablement.
- Si aucune structure, la plateforme garde 5%.

## 🗄️ Schéma de base de données

- **users** : id, email, password, full_name, phone, country, role, created_at
- **startups** : id, name, description, logo_url, website, created_by, created_at
- **products** : id, name, description, price, image_url, startup_id, created_at
- **structures** : id, name, description, logo_url, structure_type, created_by, created_at
- **commissions** : id, startup_id, structure_id, percentage
- **support_links** : id, startup_id, url, label
- **vip_club** : id, name, benefits_description, discount_percentage, startup_ids

## 🔐 Sécurité & Accès

- Authentification Supabase avec gestion des rôles (`client`, `startup`, `structure`, `admin`)
- RLS (Row Level Security) sur toutes les tables sensibles
- Dashboards dynamiques selon le rôle

## 📦 Fonctionnalités

- Multilingue (Français, Anglais, Arabe, Darija)
- Upload d’images via Supabase Storage
- Dashboards avancés (ventes, commissions, activité)
- Programmes VIP et gestion des remises
- Intégration paiement (Stripe/Flutterwave, optionnel)
- API RESTful sécurisée

## 🚀 Installation

1. **Cloner le repo**
   ```bash
   git clone <repo-url>
   cd lstestvr
   ```

2. **Configurer les variables d’environnement**
   ```
   cp ltvr/.env.example ltvr/.env
   # puis éditer ltvr/.env avec vos clés Supabase
   ```

3. **Installer les dépendances**
   ```bash
   cd ltvr
   npm install
   ```

4. **Lancer le projet**
   ```bash
   npm run dev
   ```

## 🛠️ Scripts utiles

- `npm run dev` : Lancer le serveur de développement
- `npm run build` : Build de production

## 📂 Arborescence du projet

```
ltvr/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── common/
│   │   ├── dashboard/
│   │   ├── startup/
│   │   ├── client/
│   │   ├── structure/
│   │   └── admin/
│   ├── pages/
│   ├── services/
│   ├── hooks/
│   ├── utils/
│   └── App.tsx
├── .env
├── package.json
├── tsconfig.json
└── Readme.md
```

## 📊 Dashboards

- **Startup** : ventes, produits, commissions, stockage utilisé
- **Structure** : startups accompagnées, commissions, activité
- **Admin** : utilisateurs, revenus, top startups
- **Client** : historique commandes, remises VIP

## 🤝 Contribuer

1. Fork le repo
2. Crée une branche (`git checkout -b feature/ma-feature`)
3. Commit tes changements (`git commit -am 'feat: nouvelle fonctionnalité'`)
4. Push la branche (`git push origin feature/ma-feature`)
5. Ouvre une Pull Request

## 📄 Licence

MIT

---

