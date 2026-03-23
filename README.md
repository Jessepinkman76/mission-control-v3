# Mission Control v3

Dashboard central de l'empire Julien - Supervision des agents IA.

## Stack

- **Next.js 14** - App Router, API routes
- **Tailwind CSS** - Style
- **TypeScript** - Type safety

## Développement

```bash
npm install
npm run dev
```

Ouvre http://localhost:3000

## API Endpoints

- `GET /api/health` - Health check
- `GET /api/agents` - Liste des agents
- `GET /api/tasks` - Liste des tâches
- `GET /api/stats` - Statistiques empire

## Déploiement

### Vercel (recommandé)

```bash
npx vercel
```

### Render

```bash
npm run build
npm start
```

## Structure

```
src/
├── app/
│   ├── api/           # API routes
│   ├── components/    # Composants React
│   ├── lib/           # Utilitaires
│   ├── globals.css    # Styles globaux
│   ├── layout.tsx     # Layout principal
│   └── page.tsx       # Page d'accueil
data/                  # Données JSON exportées
```

---

_Empire Julien • Mission Control v3 • Next.js 14_