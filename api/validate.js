export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const body = await getRawBody(req);
  const params = new URLSearchParams(body.toString());
  const jwt = params.get('JWT');

  const DINELCO_BASE = 'https://dev-sgwf-01.bepsa.com.py';

  const response = await fetch(
    `${DINELCO_BASE}/d/api/checkout-session/validate`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ JWT: jwt }),
      redirect: 'follow',
    }
  );

  let html = await response.text();

  // Rewrite relative asset paths to absolute Dinelco URLs
  html = html
    .replace(/(src|href)="\//g, `$1="${DINELCO_BASE}/`)
    .replace(/(src|href)='\//g, `$1='${DINELCO_BASE}/`)
    // Also fix any relative paths in JS (e.g. fetch("/api/..."))
    .replace(/from "\//g, `from "${DINELCO_BASE}/`)
    .replace(/fetch\("\//g, `fetch("${DINELCO_BASE}/`);

  res.setHeader('Content-Type', 'text/html');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.status(200).send(html);
}

// Vercel doesn't auto-parse body for custom content types
async function getRawBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on('data', chunk => chunks.push(chunk));
    req.on('end', () => resolve(Buffer.concat(chunks)));
    req.on('error', reject);
  });
}