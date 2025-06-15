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

