import fs from 'fs'
import path from 'path'
import React from 'react'
import ReactDOMServer from 'react-dom/server'

// Compile-time pages and data
const { realmPages } = await import('../build/src/pages/realms/index.js')
const { realms } = await import('../build/src/data/realmMetadata.js')
const { realmIcons } = await import('../build/src/data/realmIcons.js')
const { loadRealmDetail } = await import('../build/src/data/realmData.js')
const RealmTemplate = (await import('../build/src/components/RealmTemplate.js')).default.default

for (const key of Object.keys(realmPages)) {
  const realm = realms[key]
  const detail = await loadRealmDetail(key)

  const element = React.createElement(RealmTemplate, {
    realmName: realm.realmName,
    corePlanets: detail.corePlanets,
    clusters: detail.clusters,
    icon: realmIcons[key],
    color: realm.color,
  })

  const markup = ReactDOMServer.renderToStaticMarkup(element)

  const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="Discover the truths within the ${realm.realmName} realm." />
    <title>${realm.realmName} Realm</title>
    <link rel="stylesheet" href="../styles/style.css" />
  </head>
  <body>
    <div id="fadeOverlay" class="start"></div>
    <div id="nebula-container">
      <div class="nebula" id="nebula1"></div>
      <div class="nebula" id="nebula2"></div>
    </div>
    <div id="stars"></div>
    <nav id="main-nav" aria-label="primary"></nav>
    <main id="react-root">${markup}</main>
    <script defer src="../scripts/background.js"></script>
    <script defer src="../scripts/nav.js"></script>
    <script defer src="../scripts/clusters.js"></script>
    <script defer src="../scripts/space.js"></script>
  </body>
</html>\n`

  const outPath = path.join('client', 'pages', `${key}.html`)
  fs.writeFileSync(outPath, html)
  console.log('Wrote', outPath)
}
