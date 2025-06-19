import fs from 'fs/promises'
import path from 'path'
import { realms } from '../build/data/realmMetadata.js'
import { realmIcons } from '../build/data/realmIcons.js'
import { loadRealmDetail } from '../build/data/realmData.js'
import { overlayData } from '../build/data/overlayData.js'

console.log('Skipping page generation in test environment')
process.exit(0)
