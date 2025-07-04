import { clusters as clusterData } from '../clusters/languish'
import { corePlanets as planetData } from '../corePlanets/languish'
import { realms } from '../realmMetadata'
import { Realm } from '../types'

export const clusters = clusterData
export const corePlanets = planetData

const realm: Realm = {
  realmName: realms['languish'].realmName,
  color: realms['languish'].color,
  clusters,
  corePlanets,
}

export default realm
