import { realms } from './realmMetadata'
import { loadRealmDetail } from './realmData'

async function validate() {
  let ok = true
  for (const key of Object.keys(realms) as (keyof typeof realms)[]) {
    const detail = await loadRealmDetail(key)
    if (!detail.clusters.length) {
      console.error(`${key} has no clusters`)
      ok = false
    }
    if (!detail.corePlanets.length) {
      console.error(`${key} has no core planets`)
      ok = false
    }
    const emotions = detail.clusters.flatMap(c => c.emotions)
    for (const planet of detail.corePlanets) {
      if (!emotions.includes(planet.emotion)) {
        console.error(
          `${planet.name} emotion '${planet.emotion}' not found in clusters for ${key}`,
        )
        ok = false
      }
    }
  }
  if (ok) {
    console.log('All realm data validated.')
  } else {
    process.exitCode = 1
  }
}

validate().catch(err => {
  console.error(err)
  process.exitCode = 1
})
