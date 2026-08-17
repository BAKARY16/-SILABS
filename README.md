# Portfolio — Sinon Bakary

Portfolio professionnel multi-pages construit avec React, TypeScript, Vite et React Router. Le contenu projet est fondé sur les repositories publics du profil GitHub [BAKARY16](https://github.com/BAKARY16). Les informations LinkedIn non accessibles publiquement n'ont pas été reproduites.

## Routes

- `/` — accueil éditorial et projet phare
- `/about` — profil, approche et progression
- `/projects` — bibliothèque filtrable Web / Data / AI / ML
- `/projects/:slug` — étude de cas détaillée pour chaque projet
- `/skills` — compétences organisées par domaines
- `/experience` — trajectoire vérifiable
- `/contact` — canaux publics et formulaire préparé pour une future intégration

Le thème clair est utilisé par défaut. Le choix clair/sombre est sauvegardé dans le navigateur.

## Direction artistique

Le thème clair est désormais le point d’entrée principal. Le langage visuel repose sur :

- la typographie **Plus Jakarta Sans** ;
- un violet principal `#7051EF` et des surfaces lavande/bleu pâle ;
- une grille maximale de `1305px` avec gouttières de `16px` ;
- des cartes très arrondies, des chips souples et des ombres faibles ;
- une échelle d’espacement fondée sur 4px ;
- des interactions courtes de 350ms et des élévations modérées ;
- un thème sombre adapté à la même identité.

Le fichier [src/styles/vibrant.css](src/styles/vibrant.css) constitue la couche de design du portfolio. Il adapte un langage de design fourni comme référence sans reprendre de logo, illustration ou asset de marque.

### Structure narrative de l’accueil

```text
Accueil — Sinon Bakary
├── Sinon Bakary, Développeur · Data · AI
├── Mes expertises
│   ├── Développement produit
│   ├── Data & systèmes
│   ├── Intelligence appliquée
│   └── Architecture & intégration
├── Projet phare — EduLab AI
├── Mon portfolio
├── Open Source / GitHub
├── Collaboration
├── À propos de moi
└── Des preuves, pas des promesses
```

La dernière section remplace volontairement les témoignages du modèle par des éléments publics et vérifiables afin de ne jamais inventer de recommandation.

## Expérience frontend

- transitions de routes basées sur l’API View Transitions avec repli CSS ;
- progression de lecture discrète ;
- révélations de sections via `IntersectionObserver`, désactivées en mouvement réduit ;
- continuité éditoriale entre les pages principales ;
- filtres projets partageables via `?category=Web|Data|AI|ML` ;
- navigation mobile accessible, fermeture par `Échap` et verrouillage du scroll ;
- lien d’évitement, focus clavier visible et prise en charge de `prefers-reduced-motion`.

## Architecture frontend

```text
src/
├── components/
│   ├── errors/       # récupération en cas d’erreur de rendu
│   ├── home/         # sections éditoriales de l’accueil
│   ├── layout/       # navbar, layout et footer persistants
│   ├── navigation/   # progression et continuité entre pages
│   ├── projects/     # cartes et blocs d’étude de cas
│   └── ui/           # éléments génériques accessibles
├── config/           # identité, navigation et métadonnées
├── data/             # projets, compétences et parcours vérifiés
├── hooks/            # thème, SEO et révélations de sections
├── pages/            # assemblage des routes
└── types/            # modèles TypeScript partagés
```

Les pages sont chargées à la demande avec `React.lazy`. Les pages restent des orchestrateurs courts ; les sections complexes et réutilisables vivent dans `components/`.

## Développement

```bash
npm install
npm run dev
```

## Vérification

```bash
npm run lint
npm run build
```

## Déploiement Vercel

1. Importer le repository dans Vercel.
2. Conserver le preset **Vite**.
3. Build command : `npm run build`.
4. Output directory : `dist`.

Aucune variable d'environnement n'est nécessaire dans la version actuelle. Un domaine personnalisé pourra être ajouté plus tard dans les paramètres du projet Vercel.

## Mise à jour du contenu

Les projets, compétences et étapes de parcours sont centralisés dans `src/data/`. Le formulaire de contact ne transmet volontairement aucune donnée : l’interface le signale clairement et LinkedIn reste le canal fonctionnel tant qu’aucun service d’envoi n’est configuré.
