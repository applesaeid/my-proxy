// api/proxy.js
export default async function handler(req, res) {
  // 1. آدرس سایت مقصد رو از پارامتر ?url= میگیریم
  const targetUrl = req.query.url;

  // 2. اگه آدرس وجود نداشت، پیغام خطا بده
  if (!targetUrl) {
    return res.status(400).send('❌ لطفاً آدرس سایت رو با ?url= وارد کن. مثال: ?url=https://example.com');
  }

  try {
    // 3. درخواست به سایت هدف
    const response = await fetch(targetUrl);
    
    // 4. برگردوندن پاسخ به مرورگر کاربر
    res.setHeader('Content-Type', response.headers.get('content-type') || 'text/html');
    res.status(response.status).send(await response.text());
    
  } catch (error) {
    res.status(500).send('❌ خطا در ارتباط با سایت مقصد.');
  }
}
