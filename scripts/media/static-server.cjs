const http = require('http')
const path = require('path')
const fs = require('fs')

const dir = path.resolve(process.argv[2] || '.')
const port = Number(process.argv[3] || 4400)
const urlPrefix = (process.argv[4] || '').replace(/\/+$/, '')

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
}

const server = http.createServer((req, res) => {
  let reqPath = decodeURIComponent((req.url || '/').split('?')[0])
  if (urlPrefix && reqPath.startsWith(urlPrefix)) {
    reqPath = reqPath.slice(urlPrefix.length) || '/'
  }
  if (reqPath.endsWith('/')) reqPath += 'index.html'
  let filePath = path.join(dir, reqPath)

  if (!filePath.startsWith(dir)) {
    res.writeHead(403)
    res.end('Forbidden')
    return
  }

  fs.stat(filePath, (err, stat) => {
    if (err || !stat.isFile()) {
      const fallback = path.join(dir, 'index.html')
      fs.readFile(fallback, (ferr, data) => {
        if (ferr) {
          res.writeHead(404)
          res.end('Not found')
          return
        }
        res.writeHead(200, { 'Content-Type': MIME['.html'] })
        res.end(data)
      })
      return
    }
    const ext = path.extname(filePath).toLowerCase()
    res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' })
    fs.createReadStream(filePath).pipe(res)
  })
})

server.listen(port, () => {
  console.log(`static-server: serving ${dir} at http://localhost:${port}`)
})
