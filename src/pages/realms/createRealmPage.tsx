import React from 'react'
import RealmTemplate from '../../components/RealmTemplate'
import { realms } from '../../data/realmMetadata'
import { realmData } from '../../data/realmData'

const createRealmPage =
  (realmKey: keyof typeof realms): React.FC =>
  () => {
    const realm = realms[realmKey]
    const { corePlanets } = realmData[realmKey]

    return <RealmTemplate realmName={realm.realmName} corePlanets={corePlanets} />
  }

export default createRealmPage
