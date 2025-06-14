import React from 'react'
import RealmTemplate from '../../components/RealmTemplate'
import { realms } from '../../data/realmMetadata'

const ZenithPage: React.FC = () => {
  const realm = realms.zenith
  return <RealmTemplate {...realm} />
}

export default ZenithPage
