import { realms } from './realmMetadata'
import { RealmDetail } from './types'

/**
 * Dynamically load detailed data for a single realm.
 */
export async function loadRealmDetail(
  realmKey: keyof typeof realms,
): Promise<RealmDetail> {
  try {
    const mod = await import(`./realms/${realmKey}`)
    return { clusters: mod.clusters, corePlanets: mod.corePlanets }
  } catch (err) {
    console.error(`Failed to load realm detail for '${realmKey}':`, err)
    return { clusters: [], corePlanets: [] }
  }
}

/**
 * Load data for all realms at once. Results are cached after first call.
 */
let cached: Partial<Record<keyof typeof realms, RealmDetail>> | null = null
export async function getAllRealmData(): Promise<Partial<Record<keyof typeof realms, RealmDetail>>> {
  if (cached) return cached
  const entries: [keyof typeof realms, RealmDetail][] = []
  for (const key of Object.keys(realms) as (keyof typeof realms)[]) {
    const detail = await loadRealmDetail(key)
    if (!detail.clusters.length && !detail.corePlanets.length) {
      console.warn(`Realm '${key}' detail missing; using empty defaults`)
    }
    entries.push([key, detail])
  }
  cached = Object.fromEntries(entries) as Partial<Record<keyof typeof realms, RealmDetail>>
  return cached
}
