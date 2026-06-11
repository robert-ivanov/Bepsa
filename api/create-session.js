export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const DINELCO_BASE = 'https://dev-sgwf-01.bepsa.com.py';// set this in Vercel env vars

  const response = await fetch(`${DINELCO_BASE}/d/api/checkout-session`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer di_sk_b063d3ab144a606d8bc31e9de60ef5d8c54d9128f0209635_353cc09b`,
    },
    body: JSON.stringify(req.body),
  });

  const data = await response.json();
  res.status(response.status).json(data);
}