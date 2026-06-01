// File: api/order.js

const crypto = require('crypto');

export default async function handler(req, res) {
  // ==========================================
  // HARDCODED API KEYS (PASTIKAN REPO PRIVATE)
  // ==========================================
  const TELEGRAM_BOT_TOKEN = "7819700390:AAEO8_9_5Xr8msBPZd2hOQ4CkxDnlHVS3b8";
  const TELEGRAM_CHAT_ID = "5775563021";

  // ==========================================
  // KREDENSIAL DUITKU (DARI ENVIRONMENT VERCEL)
  // ==========================================
  const MERCHANT_CODE = process.env.DUITKU_MERCHANT_CODE;
  const API_KEY       = process.env.DUITKU_API_KEY;
  const BASE_URL      = process.env.DUITKU_BASE_URL || 'https://sandbox.duitku.com/webapi';

  // ─── GET: CEK STATUS PEMBAYARAN DUITKU ────────────────────────────────
  if (req.method === 'GET') {
    try {
      const { orderId } = req.query;
      if (!orderId) return res.status(400).json({ error: 'Parameter orderId wajib diisi' });

      // Signature untuk cek status: MD5(merchantCode + merchantOrderId + apiKey)
      const signature = crypto
        .createHash('md5')
        .update(`${MERCHANT_CODE}${orderId}${API_KEY}`)
        .digest('hex');

      const response = await fetch(`${BASE_URL}/api/merchant/transactionStatus`, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({
          merchantCode:    MERCHANT_CODE,
          merchantOrderId: orderId,
          signature:       signature,
        }),
      });

      const data = await response.json();
      return res.status(200).json(data);
    } catch (error) {
      console.error("Check Payment GET Error:", error.message);
      return res.status(500).json({ success: false, error: error.message });
    }
  }

  // ─── POST: KIRIM NOTIFIKASI TELEGRAM ──────────────────────────────────
  if (req.method === 'POST') {
    try {
      const { productName, period, qty, total, contact, orderId } = req.body;

      // Susun format pesan yang akan dikirim ke Telegram
      // Teks sedikit disesuaikan karena menggunakan payment gateway
      const messageText = 
        `🔔 *PESANAN BARU MASUK*\n\n` +
        `${orderId ? `🔖 *Order ID:* ${orderId}\n` : ''}` +
        `📦 *Produk:* ${productName}\n` +
        `⏳ *Periode:* ${period}\n` +
        `🔢 *Jumlah:* ${qty}x\n` +
        `💰 *Total:* Rp${total.toLocaleString('id-ID')}\n` +
        `📞 *Kontak:* ${contact}\n\n` +
        `_Pesanan sedang diproses. Cek status pembayaran di dashboard Duitku._`;

      // Endpoint API Telegram
      const tgUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
      
      const response = await fetch(tgUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: messageText,
          parse_mode: 'Markdown'
        })
      });

      if (!response.ok) {
        throw new Error(`Telegram API Error ${response.status}`);
      }

      return res.status(200).json({ success: true, message: 'Notifikasi berhasil dikirim' });

    } catch (error) {
      console.error("Order POST Error:", error.message);
      return res.status(500).json({ success: false, error: error.message });
    }
  }

  // ─── METHOD LAIN DITOLAK ──────────────────────────────────────────────
  return res.status(405).json({ success: false, error: 'Method not allowed' });
}
