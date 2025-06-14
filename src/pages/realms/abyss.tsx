import React from 'react'
import RealmTemplate from '../../components/RealmTemplate'
import { realms } from '../../data/realmMetadata'

const AbyssPage: React.FC = () => {
  const realm = realms.abyss
  return <RealmTemplate {...realm} />
}

export default AbyssPage
