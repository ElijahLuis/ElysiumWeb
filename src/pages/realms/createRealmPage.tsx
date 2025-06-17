import React from 'react'
import RealmTemplate from '../../components/RealmTemplate'
import { realms } from '../../data/realmMetadata'
import { realmIcons } from '../../data/realmIcons'
import { loadRealmDetail } from '../../data/realmData'
import { useEffect, useState } from 'react'
import type { RealmDetail } from '../../data/types'

const createRealmPage =
  (realmKey: keyof typeof realms): React.FC =>
  () => {
    const realm = realms[realmKey]
    const [detail, setDetail] = useState<RealmDetail | null>(null)

    useEffect(() => {
      loadRealmDetail(realmKey).then(d => setDetail(d))
    }, [])

    if (!detail) return null
    return (
      <RealmTemplate
        realmName={realm.realmName}
        corePlanets={detail.corePlanets}
        clusters={detail.clusters}
        icon={realmIcons[realmKey]}
        color={realm.color}
      />
    )
  }

export default createRealmPage
