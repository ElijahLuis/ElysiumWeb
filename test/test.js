const { spawn } = require('child_process');
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
    http.get({ hostname: 'localhost', port: PORT, path: pathname }, res => {
      let data = '';
      res.on('data', chunk => (data += chunk));
      res.on('end', () =>
        resolve({ statusCode: res.statusCode, headers: res.headers, data })
      );
    }).on('error', reject);
  });
}

async function run() {
  const heart = spawn('node', ['server.js'], { env: { ...process.env, PORT } });
  await wait(500);

  try {
    const indexPath = path.join(__dirname, '..', 'client', 'index.html');
    assert.ok(fs.existsSync(indexPath), 'index.html should exist');

    const root = await fetch('/');
    assert.strictEqual(root.statusCode, 200, 'root path should return 200');

    const missing = await fetch('/does-not-exist');
    assert.strictEqual(missing.statusCode, 404, 'missing page should return 404');

    const universe = await fetch('/pages/universe.html');
    assert.strictEqual(universe.statusCode, 200, 'universe page should return 200');
    assert.ok(
      universe.data.includes('universe-page'),
      'universe page should contain its unique class'
    );

    const css = await fetch('/styles/style.css');
    assert.strictEqual(css.statusCode, 200, 'style.css should return 200');
    assert.strictEqual(
      css.headers['content-type'],
      'text/css',
      'style.css should have text/css content-type'
    );

    console.log('All tests passed.');
  } finally {
    heart.kill();
  }
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
