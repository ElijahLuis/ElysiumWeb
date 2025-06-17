import fs from 'fs/promises'
import path from 'path'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { realms } from '../build/data/realmMetadata.js'
import { realmIcons } from '../build/data/realmIcons.js'
import { loadRealmDetail } from '../build/data/realmData.js'
import RealmTemplateModule from '../build/components/RealmTemplate.js'
const RealmTemplate = RealmTemplateModule.default || RealmTemplateModule

const pagesDir = path.join(process.cwd(), 'client', 'pages')

await fs.mkdir(pagesDir, { recursive: true })

for (const key of Object.keys(realms)) {
  const detail = await loadRealmDetail(key)
  const body = renderToStaticMarkup(
    React.createElement(RealmTemplate, {
      realmName: realms[key].realmName,
      corePlanets: detail.corePlanets,
      clusters: detail.clusters,
      icon: realmIcons[key] || '',
      color: realms[key].color,
    })
  )

  const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${realms[key].realmName} Realm</title>
    <link rel="stylesheet" href="../styles/style.css" />
  </head>
  <body>
    <div id="fadeOverlay"></div>
    <div id="nebula-container">
      <div class="nebula" id="nebula1"></div>
      <div class="nebula" id="nebula2"></div>
    </div>
    <div id="stars"></div>
    <nav id="main-nav" aria-label="primary"></nav>
    <main id="react-root">${body}</main>
    <script src="../scripts/background.js"></script>
    <script src="../scripts/nav.js"></script>
    <script src="../scripts/clusters.js"></script>
  </body>
</html>`

  await fs.writeFile(path.join(pagesDir, `${key}.html`), html)
  console.log(`Generated ${key}.html`)
}
