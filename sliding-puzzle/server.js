const https = require('https');
const fs = require('fs');
const path = require('path');

const options = {
  key:  fs.readFileSync(path.join(__dirname, '192.168.0.33+2-key.pem')),
  cert: fs.readFileSync(path.join(__dirname, '192.168.0.33+2.pem')),
};

const PORT = 3000;

https.createServer(options, (req, res) => {
  const filePath = path.join(__dirname, 'index.html');
  fs.readFile(filePath, (err, data) => {
    if (err) { res.writeHead(404); res.end('Not found'); return; }
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(data);
  });
}).listen(PORT, '0.0.0.0', () => {
  console.log(`Serving on https://192.168.0.33:${PORT}`);
  console.log(`Also on    https://localhost:${PORT}`);
});
