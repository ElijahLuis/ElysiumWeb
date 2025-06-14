# Elysium Web: Core Site Map

This document outlines the initial five feature structure for the project. It mirrors the poetic direction of Elysium while keeping the code base modular and easy to extend.

## 1. `/realms`
A hub for all ten realms. The page presents them as a starmap or interactive grid. Hovering or tapping previews the vibe through color shifts and ambient cues. Each realm links to its dedicated page at `/realms/[realmId]`.

## 2. `/realms/[realmId]`
Dynamic pages that welcome visitors to individual realms. A cinematic header introduces the realm followed by lists of emotion clusters and core planets.

## 3. `/map`
A visual constellation of the entire emotional universe. This will grow into a navigational backbone, showing relationships and transitions between realms.

## 4. `/explore`
For wanderers unsure of where to start. The page can gently guide users to a realm and cluster based on how they feel in the moment.

## 5. `/elysium`
A minimal, poetic explanation of the project’s philosophy and future plans.

---

## Directory Skeleton
```
/public
  /audio
  /images
  favicon.ico
/src
  /components
    RealmTemplate.tsx
    PlanetCard.tsx
    ClusterBlock.tsx
    GradientHeader.tsx
    RealmMap.tsx
  /data
    realmMetadata.ts
    /planets
      abyss.ts
      oasis.ts
      ...
    /clusters
      abyss.ts
      oasis.ts
      ...
    /utils
      getRealmData.ts
  /pages
    index.tsx
    realms/index.tsx
    realms/[realmId].tsx
    map.tsx
    explore.tsx
    elysium.tsx
  /styles
    globals.css
  /types
    realm.ts
    planet.ts
    cluster.ts
```

This outline mirrors the Next.js inspired structure proposed for future development. Each piece is intentionally modular so the project can grow gracefully.
