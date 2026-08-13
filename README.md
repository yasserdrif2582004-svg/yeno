# YENO - Menu Digital pour Restaurants & Cafés

## Structure du projet

```
├── app/
│   ├── page.tsx              # Landing page publique
│   ├── login/page.tsx        # Connexion
│   ├── register/page.tsx     # Inscription (avec choix de plan)
│   ├── contact/page.tsx      # Page contact
│   ├── demo/page.tsx         # Démo menu (Le Petit Bistro)
│   ├── menu/[slug]/          # Menu public d'un restaurant
│   ├── dashboard/            # Espace client
│   │   ├── layout.tsx
│   │   ├── page.tsx          # Tableau de bord
│   │   ├── menu/page.tsx     # Éditeur de menu (avec photos)
│   │   ├── settings/page.tsx # Paramètres (logo, couleurs, template)
│   │   ├── qr-code/page.tsx  # Génération QR code
│   │   └── requests/page.tsx # Demandes de changement
│   └── admin/                # Espace admin
│       ├── layout.tsx
│       ├── page.tsx          # Stats globales
│       ├── clients/page.tsx  # Liste des clients
│       └── requests/page.tsx # Gestion des demandes
├── components/
│   ├── Navbar.tsx            # Navigation publique
│   ├── Footer.tsx            # Footer
│   ├── AuthProvider.tsx      # Provider auth
│   ├── ClientSidebar.tsx     # Sidebar client
│   ├── AdminSidebar.tsx      # Sidebar admin
│   └── PublicMenuContent.tsx # Menu public (templates + langues)
├── lib/
│   ├── firebase.ts           # Config Firebase
│   ├── firebase-utils.ts     # Fonctions CRUD
│   └── useAuth.ts            # Hook auth
├── types/
│   └── index.ts              # Types, PLANS, TEMPLATES
├── tailwind.config.ts        # Config Tailwind (couleurs YENO)
├── next.config.js            # Config Next.js (images)
└── .env.local                # Variables d'environnement
```

## Installation

1. Créer un projet Next.js :
```bash
npx create-next-app@latest yeno --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
cd yeno
```

2. Installer les dépendances :
```bash
npm install firebase lucide-react
```

3. Copier tous les fichiers du ZIP dans le projet.

4. Configurer Firebase dans `.env.local` avec tes vraies clés.

5. Lancer :
```bash
npm run dev
```

## Accès

- **Public** : `/` (landing), `/demo`, `/contact`, `/menu/[slug]`
- **Client** : `/dashboard` (connexion requise)
- **Admin** : `/admin` (connexion + role="admin" requis)

## Fonctionnalités

- ✅ Landing page avec présentation des plans
- ✅ Auth (inscription / connexion / déconnexion)
- ✅ 3 plans : Standard (60DH), Premium (100DH), Pro (150DH)
- ✅ 15 templates visuels pour le menu public
- ✅ Upload de logo et photos de plats
- ✅ Personnalisation des couleurs
- ✅ Menu public multilingue (FR/EN/ES) pour le plan Pro
- ✅ Génération et téléchargement de QR code
- ✅ Système de demandes de changement (client → admin)
- ✅ Dashboard admin complet (stats, clients, demandes)
