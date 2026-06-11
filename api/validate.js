// export default async function handler(req, res) {
//   if (req.method !== 'POST') return res.status(405).end();

//   const body = await getRawBody(req);
//   const params = new URLSearchParams(body.toString());
//   const jwt = params.get('JWT');

//   if (!jwt) return res.status(400).send('Missing JWT');

//   const DINELCO_BASE = 'https://dev-sgwf-01.bepsa.com.py';

//   const response = await fetch(
//     `${DINELCO_BASE}/d/api/checkout-session/validate`,
//     {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
//       body: new URLSearchParams({ JWT: jwt }),
//       redirect: 'follow',
//     }
//   );

//   let html = await response.text();

//   // Rewrite relative asset URLs to absolute Dinelco URLs
//   html = html
//     .replace(/(src|href)="\//g, `$1="${DINELCO_BASE}/`)
//     .replace(/(src|href)='\//g, `$1='${DINELCO_BASE}/`)
//     .replace(/url\("\//g, `url("${DINELCO_BASE}/`)
//     .replace(/url\('\//g, `url('${DINELCO_BASE}/`);

//   // ✅ Strip headers that block iframe embedding
//   const blockedHeaders = [
//     'x-frame-options',
//     'content-security-policy',
//     'content-security-policy-report-only',
//   ];

//   response.headers.forEach((value, key) => {
//     if (!blockedHeaders.includes(key.toLowerCase())) {
//       res.setHeader(key, value);
//     }
//   });

//   // ✅ Explicitly allow embedding from your domain
//   res.setHeader('Content-Security-Policy', "frame-ancestors 'self' https://bepsa.vercel.app");
//   res.setHeader('Content-Type', 'text/html');
//   res.status(200).send(html);
// }

// async function getRawBody(req) {
//   return new Promise((resolve, reject) => {
//     const chunks = [];
//     req.on('data', chunk => chunks.push(chunk));
//     req.on('end', () => resolve(Buffer.concat(chunks)));
//     req.on('error', reject);
//   });
// }