import { realms } from './realmMetadata'
import { EmotionCluster, CorePlanet, RealmDetail } from './types'

import { clusters as abyssClusters } from './clusters/abyss'
import { corePlanets as abyssPlanets } from './planets/abyss'

import { clusters as cavernClusters } from './clusters/cavern'
import { corePlanets as cavernPlanets } from './planets/cavern'

import { clusters as drossClusters } from './clusters/dross'
import { corePlanets as drossPlanets } from './planets/dross'

import { clusters as emberClusters } from './clusters/ember'
import { corePlanets as emberPlanets } from './planets/ember'

import { clusters as glareClusters } from './clusters/glare'
import { corePlanets as glarePlanets } from './planets/glare'

import { clusters as languishClusters } from './clusters/languish'
import { corePlanets as languishPlanets } from './planets/languish'

import { clusters as mistClusters } from './clusters/mist'
import { corePlanets as mistPlanets } from './planets/mist'

import { clusters as oasisClusters } from './clusters/oasis'
import { corePlanets as oasisPlanets } from './planets/oasis'

import { clusters as traceClusters } from './clusters/trace'
import { corePlanets as tracePlanets } from './planets/trace'

import { clusters as zenithClusters } from './clusters/zenith'
import { corePlanets as zenithPlanets } from './planets/zenith'

export const realmData: Record<keyof typeof realms, RealmDetail> = {
  abyss: { clusters: abyssClusters, corePlanets: abyssPlanets },
  cavern: { clusters: cavernClusters, corePlanets: cavernPlanets },
  dross: { clusters: drossClusters, corePlanets: drossPlanets },
  ember: { clusters: emberClusters, corePlanets: emberPlanets },
  glare: { clusters: glareClusters, corePlanets: glarePlanets },
  languish: { clusters: languishClusters, corePlanets: languishPlanets },
  mist: { clusters: mistClusters, corePlanets: mistPlanets },
  oasis: { clusters: oasisClusters, corePlanets: oasisPlanets },
  trace: { clusters: traceClusters, corePlanets: tracePlanets },
  zenith: { clusters: zenithClusters, corePlanets: zenithPlanets },
}
