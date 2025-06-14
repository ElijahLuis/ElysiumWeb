import React from 'react'
import RealmTemplate from '../../components/RealmTemplate'
import { realms } from '../../data/realmMetadata'

const createRealmPage =
  (realmKey: keyof typeof realms): React.FC =>
  () => {
    const realm = realms[realmKey]
    return <RealmTemplate {...realm} />
  }

export default createRealmPage
