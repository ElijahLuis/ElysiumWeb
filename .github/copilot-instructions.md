# AI Agent Instructions for Elysium Web

This guide will help you understand the Elysium Web project's architecture, patterns, and workflows to make meaningful contributions.

## Project Overview
Elysium is an emotion-driven digital cosmos built with a unique architecture:
- `client/` contains static site assets (HTML/CSS/JS)
- `src/` houses React/TypeScript components and data models
- Build process renders static pages from React components
- Star field parallax effect creates immersive cosmos experience

## Key Architecture Patterns

### 1. Realm Data Structure
```typescript
// Core interfaces in src/data/types.ts
interface EmotionCluster {
  name: string
  emotions: string[]
}

interface CorePlanet {
  name: string
  emotion: string
  satellites?: string[]
}
```

### 2. Data Flow
- Realm metadata defined in `src/data/realmMetadata.ts`
- Emotion clusters in `src/data/clusters/<realm>.ts`
- Core planets in `src/data/corePlanets/<realm>.ts`
- React components in `src/components/` render realm pages
- Build process generates static HTML in `client/pages/`

## Development Workflow
1. Local Development:
   ```bash
   npm run dev  # Watch mode for TS compilation + auto-rebuild
   ```

2. Building:
   ```bash
   npm run build  # Compiles TS, renders pages, updates overlayData
   ```

## Project-Specific Guidelines

1. **Emotion-First Design**
   - Components should reflect their emotional themes
   - Variable/function names should be descriptive and emotionally resonant
   - Example: See `client/scripts/background.js` for star field implementation

2. **Static Site Architecture**
   - No backend logic without explicit instruction
   - Pages pre-rendered at build time
   - Minimal external dependencies

3. **Naming Conventions**
   - Realms, planets, and clusters follow strict naming patterns
   - Check `src/data/realmMetadata.ts` before modifying names
   - Full schema in `client/lore/realmsFull.ts`

4. **Code Style**
   - Use semantic HTML for accessibility
   - Implement responsive layouts
   - Keep code modular and well-commented
   - Format with `npm run format`

## Cross-Component Communication
- React components receive realm data as props
- Star field communicates via mouse events for parallax
- Overlay data shared through `client/scripts/overlayData.js`

Remember: This project is "art disguised as software" - prioritize emotional resonance while maintaining technical excellence.