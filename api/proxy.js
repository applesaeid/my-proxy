export default async function handler(req, res) {
  const targetUrl = req.query.url;
  if (!targetUrl) {
    return res.status(400).send('لطفاً آدرس ?url= را وارد کنید');
  }
  try {
    const response = await fetch(targetUrl);
    res.setHeader('Content-Type', response.headers.get('content-type') || 'text/html');
    res.status(response.status).send(await response.text());
  } catch (error) {
    res.status(500).send('خطا در ارتباط');
  }
}
