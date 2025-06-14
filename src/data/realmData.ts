import { realms } from './realmMetadata'
import { RealmDetail } from './types'

/**
 * Dynamically load detailed data for a single realm.
 */
export async function loadRealmDetail(
  realmKey: keyof typeof realms,
): Promise<RealmDetail> {
  const mod = await import(`./realms/${realmKey}`)
  return { clusters: mod.clusters, corePlanets: mod.corePlanets }
}

/**
 * Load data for all realms at once. Results are cached after first call.
 */
let cached: Record<keyof typeof realms, RealmDetail> | null = null
export async function getAllRealmData(): Promise<Record<keyof typeof realms, RealmDetail>> {
  if (cached) return cached
  const entries = await Promise.all(
    (Object.keys(realms) as (keyof typeof realms)[]).map(async key => [
      key,
      await loadRealmDetail(key),
    ] as const),
  )
  cached = Object.fromEntries(entries) as Record<keyof typeof realms, RealmDetail>
  return cached
}
