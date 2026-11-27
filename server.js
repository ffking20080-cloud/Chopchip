
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const ROOT = __dirname;

const mime = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

const server = http.createServer((req, res) => {
  let url = decodeURIComponent(req.url.split('?')[0]);

  if (url === '/') url = '/index.html';

  const file = path.join(ROOT, path.normalize(url));

  if (!file.startsWith(ROOT + path.sep)) {
    res.writeHead(403);
    return res.end('Forbidden');
  }

  fs.readFile(file, (err, data) => {
    if (err) {
      res.writeHead(404);
      return res.end('File not found');
    }

    res.writeHead(200, {
      'Content-Type': mime[path.extname(file)] || 'application/octet-stream'
    });
    res.end(data);
  });
});

server.listen(PORT, '0.0.0.0', () => {
  console.log('MINUS-X running on port ' + PORT);
});
    
