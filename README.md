# Elysium Web

This repository contains the static assets for the Elysium Web project. The `client/` directory holds the HTML, CSS and JavaScript that make up the site.

Elysium is a digital cosmos shaped by feeling. Every page and line of code aims to evoke honest reflection. To understand the heart behind this project, read the [core philosophy](lore/core.md) and let emotion guide your journey.

## Running locally
A small Node server is included to serve the contents of `client/` for development. Run the following commands:

```bash
npm start
```

This will start a server on [http://localhost:3000](http://localhost:3000). No additional dependencies are required.

## Compiling the `src` directory
React components live in `src/` and are written in TypeScript. After installing
dependencies run:

```bash
npm run build
```

The compiled JavaScript will appear in `build/` using the configuration in
`tsconfig.json`.

## Realm metadata
For a high-level overview of planned pages and directory layout, see [lore/site-map.md](lore/site-map.md).
Planetary names are stored in `src/data/realmMetadata.ts`. 
Each entry defines a realm by name and is used across the React pages to generate the planetary views.

Emotion clusters for each realm live in `src/data/clusters/`. 
Their matching core planets are listed in `src/data/planets/`. 
The shared interfaces `EmotionCluster` and `CorePlanet` reside in `src/data/types.ts` so these structures stay consistent.

## Exploring the Universe demo
After logging in you can navigate to the planetary view by clicking **Begin Your Journey**. More to be added in the future. 