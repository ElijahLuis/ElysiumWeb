import { clusters as clusterData } from '../clusters/dross'
import { corePlanets as planetData } from '../corePlanets/dross'
import { realms } from '../realmMetadata'
import { Realm } from '../types'

export const clusters = clusterData
export const corePlanets = planetData

const realm: Realm = {
  realmName: realms['dross'].realmName,
  color: realms['dross'].color,
  clusters,
  corePlanets,
}

export default realm
