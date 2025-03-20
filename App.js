const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end('<h1>Willkommen zur skalierten App!</h1>');
});

server.listen(8081, () => {
  console.log('Server läuft auf Port 8081');
});
