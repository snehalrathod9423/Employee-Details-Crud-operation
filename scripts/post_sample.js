const http = require('http');

const data = JSON.stringify({
  firstName: 'Alice',
  lastName: 'Johnson',
  email: 'alice.johnson+post@example.com',
  position: 'Developer',
  salary: 75000
});

const port = process.env.PORT ? Number(process.env.PORT) : 3000;

const options = {
  hostname: '127.0.0.1',
  port: port,
  path: '/employees',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(data)
  },
  timeout: 5000
};

const req = http.request(options, (res) => {
  let body = '';
  res.setEncoding('utf8');
  res.on('data', (chunk) => { body += chunk; });
  res.on('end', () => {
    console.log('STATUS', res.statusCode);
    try { console.log(JSON.parse(body)); } catch (e) { console.log(body); }
    process.exit(0);
  });
});

req.on('error', (e) => {
  console.error('REQUEST ERROR', e.message);
  process.exit(2);
});

req.write(data);
req.end();
