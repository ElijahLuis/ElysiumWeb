import React from 'react'
import RealmTemplate from '../../components/RealmTemplate'
import { realms } from '../../data/realmMetadata'
import { CorePlanet } from '../../data/types'
import { corePlanets as abyssPlanets } from '../../data/planets/abyss'
import { corePlanets as cavernPlanets } from '../../data/planets/cavern'
import { corePlanets as drossPlanets } from '../../data/planets/dross'
import { corePlanets as emberPlanets } from '../../data/planets/ember'
import { corePlanets as glarePlanets } from '../../data/planets/glare'
import { corePlanets as languishPlanets } from '../../data/planets/languish'
import { corePlanets as mistPlanets } from '../../data/planets/mist'
import { corePlanets as oasisPlanets } from '../../data/planets/oasis'
import { corePlanets as tracePlanets } from '../../data/planets/trace'
import { corePlanets as zenithPlanets } from '../../data/planets/zenith'

const createRealmPage =
  (realmKey: keyof typeof realms): React.FC =>
  () => {
    const realm = realms[realmKey]
    const planetMap: Record<keyof typeof realms, CorePlanet[]> = {
      abyss: abyssPlanets,
      cavern: cavernPlanets,
      dross: drossPlanets,
      ember: emberPlanets,
      glare: glarePlanets,
      languish: languishPlanets,
      mist: mistPlanets,
      oasis: oasisPlanets,
      trace: tracePlanets,
      zenith: zenithPlanets,
    }

    const corePlanets = planetMap[realmKey]

    return <RealmTemplate realmName={realm.realmName} corePlanets={corePlanets} />
  }

export default createRealmPage
