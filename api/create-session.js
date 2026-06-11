export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();



  if (!API_KEY) {
    return res.status(500).json({ error: 'DINELCO_API_KEY not set' });
  }

  try {
    const response = await fetch(`https://dev-sgwf-01.bepsa.com.py/dinelco-checkout/api/v1/checkout-session`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer di_sk_b063d3ab144a606d8bc31e9de60ef5d8c54d9128f0209635_353cc09b`,
      },
      body: JSON.stringify(req.body),
    });

    const text = await response.text();
    console.log('Dinelco response:', response.status, text);

    let data;
    try {
      data = JSON.parse(text);
    } catch {
      return res.status(502).json({ error: 'Invalid JSON from Dinelco', raw: text });
    }

    return res.status(response.status).json(data);

  } catch (err) {
    console.error('Dinelco fetch error:', err);
    return res.status(500).json({ error: err.message });
  }
}