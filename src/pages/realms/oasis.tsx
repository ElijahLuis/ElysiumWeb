import React from 'react'
import RealmTemplate from '../../components/RealmTemplate'
import { realms } from '../../data/realmMetadata'

const OasisPage: React.FC = () => {
  const realm = realms.oasis
  return <RealmTemplate {...realm} />
}

export default OasisPage
