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

// Send plain 404 when the requested file is not found
function send404(res) {
  res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' })
  res.end('Not found')
}

function serveFile(filePath, req, res) {
  const ext = path.extname(filePath).toLowerCase()
  const contentType = mimeTypes[ext] || 'application/octet-stream'

  if (req.method === 'HEAD') {
    res.writeHead(200, { 'Content-Type': contentType })
    res.end()
    return
  }

  const stream = fs.createReadStream(filePath)
  stream.on('error', (err) => {
    console.error(`Error reading ${filePath}:`, err)
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
      console.error(`Failed to access ${filePath}:`, err)
      send404(res)
      return
    }
    if (stats.isDirectory()) {
      filePath = path.join(filePath, 'index.html')
    }
    serveFile(filePath, req, res)
  })
})

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
})
