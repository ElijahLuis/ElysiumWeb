const http = require('http')
const fs = require('fs')
const path = require('path')
const root = path.join(__dirname, '..', 'client')
const port = process.env.PORT || 3000

const mimeTypes = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
}

// Gracefully serve the poetic 404 page when the requested file slips away.
function send404(res) {
  const page = path.join(root, '404.html')
  if (fs.existsSync(page)) {
    res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' })
    fs.createReadStream(page).pipe(res)
  } else {
    // Fallback to simple text if the page is missing
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' })
    res.end('Not found')
  }
}

function serveFile(filePath, res) {
  const ext = path.extname(filePath).toLowerCase()
  const contentType = mimeTypes[ext] || 'application/octet-stream'
  const stream = fs.createReadStream(filePath)
  stream.on('error', () => {
    send404(res)
  })
  res.writeHead(200, { 'Content-Type': contentType })
  stream.pipe(res)
}

const server = http.createServer((req, res) => {
  const requestPath = decodeURI(req.url.split('?')[0])
  let filePath = path.normalize(path.join(root, requestPath))

  if (!filePath.startsWith(root)) {
    send404(res)
    return
  }

  if (requestPath === '/' || requestPath.endsWith('/')) {
    filePath = path.join(filePath, 'index.html')
  }

  fs.stat(filePath, (err, stats) => {
    if (err) {
      send404(res)
      return
    }
    if (stats.isDirectory()) {
      filePath = path.join(filePath, 'index.html')
    }
    serveFile(filePath, res)
  })
})

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
})
