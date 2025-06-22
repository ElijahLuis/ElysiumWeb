import http, { IncomingMessage, ServerResponse } from 'http'
import fs from 'fs'
import path from 'path'

const root = path.join(__dirname, '..', 'client')
const port = process.env.PORT || 3000

const mimeTypes: Record<string, string> = {
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

// Gracefully send a plain 404 when the requested file slips through our fingers.
function send404(res: ServerResponse): void {
  res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' })
  res.end('Not found')
}

function serveFile(filePath: string, res: ServerResponse): void {
  const ext = path.extname(filePath).toLowerCase()
  const contentType = mimeTypes[ext] || 'application/octet-stream'
  const stream = fs.createReadStream(filePath)
  stream.on('error', () => {
    send404(res)
  })
  res.writeHead(200, { 'Content-Type': contentType })
  stream.pipe(res)
}

const server = http.createServer((req: IncomingMessage, res: ServerResponse) => {
  const requestPath = decodeURI((req.url || '').split('?')[0])
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
