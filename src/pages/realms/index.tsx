import createRealmPage from './createRealmPage'
import { realms } from '../../data/realmMetadata'

export const realmPages: Record<keyof typeof realms, React.FC> = Object.fromEntries(
  (Object.keys(realms) as (keyof typeof realms)[]).map(key => [
    key,
    createRealmPage(key),
  ])
) as Record<keyof typeof realms, React.FC>

export default realmPages
