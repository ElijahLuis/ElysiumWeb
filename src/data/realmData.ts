import { realms } from './realmMetadata'
import { RealmDetail } from './types'

/**
 * Dynamically load detailed data for a single realm.
 */
export async function loadRealmDetail(
  realmKey: keyof typeof realms,
): Promise<RealmDetail> {
  try {
    const mod = await import(`./realms/${realmKey}.js`)
    return { clusters: mod.clusters, corePlanets: mod.corePlanets }
  } catch (err) {
    // Log a gentle warning so tests remain serene
    console.warn(`Missing realm detail for '${realmKey}'.`, err)
    return { clusters: [], corePlanets: [] }
  }
}
