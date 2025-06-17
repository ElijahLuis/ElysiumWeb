const { spawn, spawnSync } = require('child_process');
const http = require('http');
const fs = require('fs');
const path = require('path');
const assert = require('assert');

const PORT = 3100; // ephemeral port for testing

function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function fetch(pathname) {
  return new Promise((resolve, reject) => {
    http
      .get({ hostname: 'localhost', port: PORT, path: pathname }, res => {
        let data = '';
        res.on('data', chunk => (data += chunk));
        res.on('end', () =>
          resolve({ statusCode: res.statusCode, headers: res.headers, data })
        );
      })
      .on('error', reject);
  });
}

async function run() {
  // compile TypeScript sources for tests
  const compile = spawnSync(
    'npx',
    ['tsc', '--module', 'commonjs', '--outDir', 'build_test'],
    {
      stdio: 'inherit',
    },
  )
  if (compile.status !== 0) {
    throw new Error('TypeScript compilation failed')
  }

  // run the full build and ensure output exists
  const build = spawnSync('npm', ['run', 'build'], { stdio: 'inherit' })
  if (build.status !== 0) {
    throw new Error('npm run build failed')
  }
  const buildOutput = path.join(__dirname, '..', 'build', 'data', 'realmData.js')
  assert.ok(fs.existsSync(buildOutput), 'build should create compiled files')
  const serverPath = path.join(__dirname, '..', 'server', 'server.js');
  const heart = spawn('node', [serverPath], { env: { ...process.env, PORT } });
  await wait(500);

  try {
    const indexPath = path.join(__dirname, '..', 'client', 'index.html');
    assert.ok(fs.existsSync(indexPath), 'index.html should exist');

    const root = await fetch('/');
    assert.strictEqual(root.statusCode, 200, 'root path should return 200');
    assert.strictEqual(
      root.headers['content-type'],
      'text/html',
      'root should be served as html'
    );

    const index = await fetch('/index.html');
    assert.strictEqual(index.statusCode, 200, 'index.html should return 200');
    assert.ok(index.data.includes('<title>Elysium Web'), 'index.html should contain title');

    const missing = await fetch('/does-not-exist');
    assert.strictEqual(missing.statusCode, 404, 'missing page should return 404');
    assert.ok(missing.data.includes('Not found'), '404 body should say Not found');

    const directory = await fetch('/pages/');
    assert.strictEqual(directory.statusCode, 404, 'directory without index should return 404');

    const universe = await fetch('/pages/universe.html');
    assert.strictEqual(universe.statusCode, 200, 'universe page should return 200');
    assert.ok(
      universe.data.includes('universe-page'),
      'universe page should contain its unique class'
    );
    assert.strictEqual(
      universe.headers['content-type'],
      'text/html',
      'universe page should be html'
    );

    const css = await fetch('/styles/style.css');
    assert.strictEqual(css.statusCode, 200, 'style.css should return 200');
    assert.strictEqual(css.headers['content-type'], 'text/css', 'style.css should have text/css content-type');

    const navPartial = await fetch('/partials/nav.html');
    assert.strictEqual(navPartial.statusCode, 200, 'nav partial should return 200');
    assert.strictEqual(navPartial.headers['content-type'], 'text/html', 'nav partial should be html');
    assert.ok(navPartial.data.includes('<nav'), 'nav partial should contain nav element');

    const universeScript = await fetch('/scripts/universe.js');
    assert.strictEqual(universeScript.statusCode, 200, 'universe.js should return 200');
    assert.strictEqual(
      universeScript.headers['content-type'],
      'application/javascript',
      'universe.js should have application/javascript content-type'
    );

    const { loadRealmDetail } = require('../build_test/data/realmData.js');
    const { realms } = require('../build_test/data/realmMetadata.js');
    const fallback = await loadRealmDetail('missing');
    assert.ok(
      Array.isArray(fallback.corePlanets) && fallback.corePlanets.length === 0,
      'loadRealmDetail should return empty detail for missing realm'
    );

    for (const key of Object.keys(realms)) {
      const detail = await loadRealmDetail(key);
      assert.ok(
        Array.isArray(detail.clusters),
        `realm ${key} should have clusters array`
      );
      assert.ok(
        Array.isArray(detail.corePlanets),
        `realm ${key} should have corePlanets array`
      );
    }

    const traversal = await fetch('/../server/server.js');
    assert.strictEqual(traversal.statusCode, 404, 'traversal attempt should return 404');

    console.log('All tests passed.');
  } finally {
    heart.kill();
  }
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
