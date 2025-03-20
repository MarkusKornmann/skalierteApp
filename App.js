const http = require('http');
const PORT = process.env.PORT || 4000;
const server = http.createServer((req, res) => { res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end(`<h1>Willkommen zur skalierten App auf Port ${PORT}!</h1>`); });
server.listen(PORT, () => { console.log(`Server läuft auf Port ${PORT}`); });
