Session3/
├── backend/          # API Express + TypeScript + PostgreSQL
│   ├── src/
│   │   ├── controllers/   # Logique métier (gestion des requêtes/réponses)
│   │   ├── models/        # Connexion et requêtes SQL (PostgreSQL)
│   │   ├── routes/        # Définition des routes (/etudiants)
│   │   ├── middlewares/   # Gestion centralisée des erreurs
│   │   └── index.ts       # Point d'entrée du serveur Express
│   ├── package.json
│   └── tsconfig.json
│
└── frontend/         # React + Vite + TypeScript (Ton projet actuel)
    ├── src/
    │   ├── components/
    │   ├── services/      # Appels API (fetch / axios)
    │   └── App.tsx
    └── package.json