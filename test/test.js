const { spawnSync, spawn } = require('child_process')
const http = require('http')
const fs = require('fs')
const path = require('path')
const assert = require('assert')

const PORT = 3100
const ROOT = path.join(__dirname, '..')

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

function fetch(pathname) {
  return new Promise((resolve, reject) => {
    http
      .get({ hostname: 'localhost', port: PORT, path: pathname }, (res) => {
        let data = ''
        res.on('data', (chunk) => (data += chunk))
        res.on('end', () =>
          resolve({ statusCode: res.statusCode, headers: res.headers, data }),
        )
      })
      .on('error', reject)
  })
}

function runCommand(cmd, args) {
  const result = spawnSync(cmd, args, { stdio: 'inherit' })
  if (result.status !== 0) throw new Error(`${cmd} ${args.join(' ')} failed`)
}

async function withServer(callback) {
  const server = spawn('node', [path.join(ROOT, 'server', 'server.js')], {
    env: { ...process.env, PORT },
  })
  await wait(500)
  try {
    await callback()
  } finally {
    server.kill()
  }
}

async function run() {
  runCommand('npx', ['tsc', '--module', 'commonjs', '--outDir', 'build_test'])
  runCommand('npm', ['run', 'build'])

  const buildOutput = path.join(ROOT, 'build', 'data', 'realmData.js')
  assert.ok(fs.existsSync(buildOutput), 'build should create compiled files')

  const { realms: builtRealms } = require('../build/data/realmMetadata.js')
  for (const [key, meta] of Object.entries(builtRealms)) {
    const pagePath = path.join(ROOT, 'client', 'pages', `${key}.html`)
    assert.ok(fs.existsSync(pagePath), `${key}.html should exist after build`)
    const contents = fs.readFileSync(pagePath, 'utf-8')
    assert.ok(
      contents.includes(meta.realmName),
      `${key}.html should include realm name`,
    )
  }

  await withServer(async () => {
    const indexPath = path.join(ROOT, 'client', 'index.html')
    assert.ok(fs.existsSync(indexPath), 'index.html should exist')

    const root = await fetch('/')
    assert.strictEqual(root.statusCode, 200, 'root path should return 200')
    assert.strictEqual(
      root.headers['content-type'],
      'text/html',
      'root should be served as html',
    )

    const index = await fetch('/index.html')
    assert.strictEqual(index.statusCode, 200, 'index.html should return 200')
    assert.ok(
      index.data.includes('<title>Elysium Web'),
      'index.html should contain title',
    )

    const missing = await fetch('/does-not-exist')
    assert.strictEqual(
      missing.statusCode,
      404,
      'missing page should return 404',
    )
    assert.ok(
      missing.data.includes('Not found'),
      '404 body should say Not found',
    )

    const directory = await fetch('/pages/')
    assert.strictEqual(
      directory.statusCode,
      404,
      'directory without index should return 404',
    )

    const universe = await fetch('/pages/universe.html')
    assert.strictEqual(
      universe.statusCode,
      200,
      'universe page should return 200',
    )

    const about = await fetch('/pages/about.html')
    assert.strictEqual(
      about.statusCode,
      200,
      'about page should return 200',
    )
    assert.ok(
      about.data.includes('About Elysium'),
      'about page should contain about heading',
    )
    assert.ok(
      universe.data.includes('universe-page'),
      'universe page should contain its unique class',
    )
    assert.strictEqual(
      universe.headers['content-type'],
      'text/html',
      'universe page should be html',
    )

    const css = await fetch('/styles/style.css')
    assert.strictEqual(css.statusCode, 200, 'style.css should return 200')
    assert.strictEqual(
      css.headers['content-type'],
      'text/css',
      'style.css should have text/css content-type',
    )

    const navPartial = await fetch('/partials/nav.html')
    assert.strictEqual(
      navPartial.statusCode,
      200,
      'nav partial should return 200',
    )
    assert.strictEqual(
      navPartial.headers['content-type'],
      'text/html',
      'nav partial should be html',
    )
    assert.ok(
      navPartial.data.includes('<nav'),
      'nav partial should contain nav element',
    )


    const universeScript = await fetch('/scripts/universe.js')
    assert.strictEqual(
      universeScript.statusCode,
      200,
      'universe.js should return 200',
    )
    assert.strictEqual(
      universeScript.headers['content-type'],
      'application/javascript',
      'universe.js should have application/javascript content-type',
    )

    const overlayScript = await fetch('/scripts/overlayData.js')
    assert.strictEqual(
      overlayScript.statusCode,
      200,
      'overlayData.js should return 200',
    )
    assert.strictEqual(
      overlayScript.headers['content-type'],
      'application/javascript',
      'overlayData.js should have application/javascript content-type',
    )

    const { loadRealmDetail } = require('../build_test/data/realmData.js')
    const { realms } = require('../build_test/data/realmMetadata.js')
    // verify that each realm page is served and contains its name
    for (const [key, meta] of Object.entries(realms)) {
      const realmPage = await fetch(`/pages/${key}.html`)
      assert.strictEqual(
        realmPage.statusCode,
        200,
        `${key} page should return 200`,
      )
      assert.ok(
        realmPage.data.includes(meta.realmName),
        `${key} page should include realm name`,
      )
    }
    const fallback = await loadRealmDetail('missing')
    assert.ok(
      Array.isArray(fallback.corePlanets) && fallback.corePlanets.length === 0,
      'loadRealmDetail should return empty detail for missing realm',
    )

    for (const key of Object.keys(realms)) {
      const detail = await loadRealmDetail(key)
      assert.ok(
        Array.isArray(detail.clusters),
        `realm ${key} should have clusters array`,
      )
      assert.ok(
        Array.isArray(detail.corePlanets),
        `realm ${key} should have corePlanets array`,
      )
    }

    const traversal = await fetch('/../server/server.js')
    assert.strictEqual(
      traversal.statusCode,
      404,
      'traversal attempt should return 404',
    )

    const starScript = fs.readFileSync(
      path.join(ROOT, 'client', 'scripts', 'stars.js'),
      'utf-8',
    )
    const { JSDOM } = require('jsdom')
    const dom = new JSDOM('<!doctype html><html><body></body></html>', {
      runScripts: 'dangerously',
      url: 'https://example.com/pages/testrealm.html',
    })
    dom.window.eval(starScript)
    dom.window.document.dispatchEvent(new dom.window.Event('DOMContentLoaded'))
    const starIcon = dom.window.document.querySelector('.collect-star')
    assert.ok(starIcon, 'star icon should be injected')
    starIcon.click()
    const firstOption = dom.window.document.querySelector('#star-overlay button')
    assert.ok(firstOption, 'overlay should show truth options')
    firstOption.click()
    assert.ok(
      dom.window.localStorage.getItem('elysium-truth-testrealm'),
      'selecting a truth should store value in localStorage',
    )

    console.log('All tests passed.')
  })
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
