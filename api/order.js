// File: api/order.js

export default async function handler(req, res) {
  // ==========================================
  // HARDCODED API KEYS (PASTIKAN REPO PRIVATE)
  // ==========================================
  const TELEGRAM_BOT_TOKEN = "7819700390:AAEO8_9_5Xr8msBPZd2hOQ4CkxDnlHVS3b8";
  const TELEGRAM_CHAT_ID = "5775563021";

  // Hanya izinkan metode POST
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  try {
    const { productName, period, qty, total, contact } = req.body;

    // Susun format pesan yang akan dikirim ke Telegram
    const messageText = 
      `🔔 *PESANAN BARU MASUK*\n\n` +
      `📦 *Produk:* ${productName}\n` +
      `⏳ *Periode:* ${period}\n` +
      `🔢 *Jumlah:* ${qty}x\n` +
      `💰 *Total:* Rp${total.toLocaleString('id-ID')}\n` +
      `📞 *Kontak:* ${contact}\n\n` +
      `_Segera cek mutasi QRIS dan proses pesanan ini._`;

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
