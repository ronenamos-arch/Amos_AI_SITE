import https from 'https';

const postData = JSON.stringify({
  host: 'www.ronenamoscpa.co.il',
  key: 'f9826b1b81c34964b0fa14797b4af314',
  keyLocation: 'https://www.ronenamoscpa.co.il/f9826b1b81c34964b0fa14797b4af314.txt',
  urlList: [
    'https://www.ronenamoscpa.co.il/blog/ai-finance-implementation',
    'https://www.ronenamoscpa.co.il/sitemap.xml',
    'https://www.ronenamoscpa.co.il/blog'
  ]
});

const req = https.request({
  hostname: 'api.indexnow.org',
  port: 443,
  path: '/indexnow',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
    'Content-Length': Buffer.byteLength(postData)
  }
}, (res) => {
  console.log('IndexNow response status:', res.statusCode);
  res.on('data', (d) => process.stdout.write(d));
});

req.on('error', (e) => console.error('IndexNow error:', e));
req.write(postData);
req.end();
