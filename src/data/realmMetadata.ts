export interface RealmMeta {
  realmName: string
  color: string
}

export const realms: Record<string, RealmMeta> = {
  abyss: { realmName: 'Abyss', color: '#d6bfff' },
  cavern: { realmName: 'Cavern', color: '#c6efe9' },
  dross: { realmName: 'Dross', color: '#e4d5cd' },
  ember: { realmName: 'Ember', color: '#f1c4b4' },
  glare: { realmName: 'Glare', color: '#ffe5b0' },
  languish: { realmName: 'Languish', color: '#c1d8f3' },
  mist: { realmName: 'Mist', color: '#e6ecf0' },
  oasis: { realmName: 'Oasis', color: '#c4f7f3' },
  trace: { realmName: 'Trace', color: '#f5c6da' },
  zenith: { realmName: 'Zenith', color: '#fff7c9' },
}
