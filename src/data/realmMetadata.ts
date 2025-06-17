export interface RealmMeta {
  realmName: string
  color: string
}

export const realms: Record<string, RealmMeta> = {
  abyss: { realmName: 'Abyss', color: '#bf9dff' },
  cavern: { realmName: 'Cavern', color: '#9ef2e3' },
  dross: { realmName: 'Dross', color: '#f0c9b3' },
  ember: { realmName: 'Ember', color: '#ffb194' },
  glare: { realmName: 'Glare', color: '#ffd96a' },
  languish: { realmName: 'Languish', color: '#86bfff' },
  mist: { realmName: 'Mist', color: '#cfe8f8' },
  oasis: { realmName: 'Oasis', color: '#76ffe5' },
  trace: { realmName: 'Trace', color: '#ffa3c0' },
  zenith: { realmName: 'Zenith', color: '#ffeba3' },
}
