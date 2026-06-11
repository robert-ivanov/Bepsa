export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const jwt = req.body?.JWT || new URLSearchParams(req.body).get('JWT');

  const response = await fetch(
    'https://dev-sgwf-01.bepsa.com.py/d/api/checkout-session/validate',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ JWT: jwt }),
      redirect: 'follow',
    }
  );

  const html = await response.text();
  res.setHeader('Content-Type', 'text/html');
  res.status(200).send(html);
}