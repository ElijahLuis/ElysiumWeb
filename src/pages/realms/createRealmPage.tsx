import React from 'react'
import RealmTemplate from '../../components/RealmTemplate'
import { realms } from '../../data/realmMetadata'
import { loadRealmDetail } from '../../data/realmData'
import { useEffect, useState } from 'react'
import type { CorePlanet } from '../../data/types'

const createRealmPage = (realmKey: keyof typeof realms): React.FC => () => {
  const realm = realms[realmKey]
  const [corePlanets, setPlanets] = useState<CorePlanet[]>([])

  useEffect(() => {
    loadRealmDetail(realmKey).then(detail => setPlanets(detail.corePlanets))
  }, [])

  return <RealmTemplate realmName={realm.realmName} corePlanets={corePlanets} />
}

export default createRealmPage
