// api/create-payment.js 
// Endpoint: POST /api/create-payment
// Dokumentasi resmi: https://docs.duitku.com/api/en

const crypto = require('crypto');

// ─── Baca dari environment variables Vercel ────────────────────────────────
const MERCHANT_CODE = process.env.DUITKU_MERCHANT_CODE;   // contoh: DS12345
const API_KEY       = process.env.DUITKU_API_KEY;          // API key dari project Duitku
const IS_SANDBOX    = process.env.DUITKU_SANDBOX !== 'false'; // default: true (sandbox)
const STORE_URL     = process.env.STORE_BASE_URL || 'https://premium-app-mu.vercel.app';

// ─── URL endpoint Duitku yang BENAR (Pop UI / Invoice) ─────────────────────
// Sandbox   : https://sandbox.duitku.com/webapi/api/merchant/createInvoice
// Production: https://passport.duitku.com/webapi/api/merchant/createInvoice
const DUITKU_URL = IS_SANDBOX
  ? 'https://sandbox.duitku.com/webapi/api/merchant/createInvoice'
  : 'https://passport.duitku.com/webapi/api/merchant/createInvoice';

export default async function handler(req, res) {
  // CORS headers (opsional, tapi aman)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // ─── Validasi env vars ────────────────────────────────────────────────────
  if (!MERCHANT_CODE || !API_KEY) {
    console.error('[create-payment] ENV VARS MISSING:', {
      MERCHANT_CODE: !!MERCHANT_CODE,
      API_KEY: !!API_KEY,
    });
    return res.status(500).json({
      error: 'Konfigurasi server tidak lengkap. Hubungi admin.',
      debug: 'MERCHANT_CODE atau API_KEY belum diset di Vercel Environment Variables.',
    });
  }

  try {
    const { productName, period, qty, total, contact, email, note, username } = req.body;

    // Validasi input wajib
    if (!productName || !total || !contact) {
      return res.status(400).json({
        error: 'Field productName, total, dan contact wajib diisi.',
      });
    }

    // Pastikan total adalah integer positif (Duitku tidak terima desimal)
    const paymentAmount = parseInt(total);
    if (isNaN(paymentAmount) || paymentAmount < 1000) {
      return res.status(400).json({
        error: `Nominal tidak valid: ${total}. Minimal Rp1.000.`,
      });
    }

    // ─── Buat merchantOrderId unik ──────────────────────────────────────────
    const merchantOrderId = `FS${Date.now()}${Math.floor(1000 + Math.random() * 9000)}`;

    // ─── Hitung SIGNATURE ───────────────────────────────────────────────────
    // Formula RESMI Duitku: MD5(merchantCode + merchantOrderId + paymentAmount + apiKey)
    const rawSignature = `${MERCHANT_CODE}${merchantOrderId}${paymentAmount}${API_KEY}`;
    const signature = crypto.createHash('md5').update(rawSignature).digest('hex');

    // Debug log (bisa dilihat di Vercel Logs)
    console.log('[create-payment] Request:', {
      merchantOrderId,
      paymentAmount,
      merchantCode: MERCHANT_CODE,
      isSandbox: IS_SANDBOX,
      url: DUITKU_URL,
    });

    // ─── Sanitasi Data Pelanggan ────────────────────────────────────────────
    const rawName   = username || contact.split('@')[0] || 'Pelanggan';
    const vaName    = rawName.substring(0, 20);

    const customerEmail = email && email.includes('@')
      ? email
      : `${contact.replace(/\D/g, '').substring(0, 10) || 'pelanggan'}@faridstore.id`;

    const phoneNumber = contact.replace(/\D/g, '').substring(0, 15);

    // ─── Pembersihan URL (Menghindari Double Slash) ─────────────────────────
    const cleanStoreUrl = STORE_URL.replace(/\/$/, '');

    // ─── Build payload ke Duitku ─────────────────────────────────────────────
    const duitkuPayload = {
      merchantCode:    MERCHANT_CODE,
      paymentAmount:   paymentAmount,
      // Parameter paymentMethod DIHAPUS karena menggunakan createInvoice
      merchantOrderId: merchantOrderId,
      productDetails:  `${productName} - ${period || '1 Bulan'} x${parseInt(qty) || 1}`.substring(0, 255),
      additionalParam: note ? note.substring(0, 255) : '',
      merchantUserInfo: (username || '').substring(0, 255),
      customerVaName:  vaName,
      email:           customerEmail,
      phoneNumber:     phoneNumber || '',
      itemDetails: [
        {
          name:     `${productName} (${period || '1 Bulan'}) x${parseInt(qty) || 1}`.substring(0, 255),
          price:    paymentAmount, // Dikunci ke total akhir untuk hindari error rounding
          quantity: 1,             // Dikunci 1 agar perhitungan (price * qty == paymentAmount) selalu valid
        },
      ],
      customerDetail: {
        firstName:   vaName,
        lastName:    '',
        email:       customerEmail,
        phoneNumber: phoneNumber || '',
      },
      callbackUrl:  `${cleanStoreUrl}/api/payment-callback`,
      returnUrl:    `${cleanStoreUrl}/?payment=success&orderId=${merchantOrderId}`,
      signature:    signature,
      expiryPeriod: 60, // expire dalam 60 menit
    };

    // ─── Kirim ke Duitku ─────────────────────────────────────────────────────
    console.log('[create-payment] Sending to Duitku URL:', DUITKU_URL);

    const duitkuRes = await fetch(DUITKU_URL, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify(duitkuPayload),
    });

    const duitkuData = await duitkuRes.json();
    console.log('[create-payment] Duitku response:', duitkuData);

    // ─── Cek apakah Duitku berhasil ──────────────────────────────────────────
    if (duitkuData.statusCode !== '00') {
      console.error('[Duitku] Error:', duitkuData);
      return res.status(502).json({
        error:   'Gagal membuat invoice pembayaran.',
        detail:  duitkuData.statusMessage || duitkuData.Message || 'Unknown Duitku error',
        rawResponse: duitkuData,
      });
    }

    // ─── Simpan order pending ke database kamu ───────────────────────────────
    try {
      const dbRes  = await fetch(`${cleanStoreUrl}/api/products`);
      const dbData = await dbRes.json();
      const payload = dbData.record ? dbData.record : dbData;

      if (!payload.orders) payload.orders = [];
      payload.orders.push({
        merchantOrderId,
        duitkuReference: duitkuData.reference || '',
        orderDate:       new Date().toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' }) + ' WIB',
        username:        username || 'Guest',
        contact,
        productName,
        period:          period || '1 Bulan',
        qty:             parseInt(qty) || 1,
        total:           paymentAmount,
        status:          'pending',
        note:            note || '',
        paymentMethod:   'Duitku',
      });

      await fetch(`${cleanStoreUrl}/api/products`, {
        method:  'PUT',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(payload),
      });

      console.log('[create-payment] Order saved to DB:', merchantOrderId);
    } catch (dbErr) {
      console.warn('[create-payment] DB save failed (non-fatal):', dbErr.message);
    }

    // ─── Kembalikan paymentUrl ke frontend ───────────────────────────────────
    return res.status(200).json({
      success:        true,
      paymentUrl:     duitkuData.paymentUrl,
      reference:      duitkuData.reference,
      merchantOrderId,
    });

  } catch (err) {
    console.error('[create-payment] Unexpected error:', err);
    return res.status(500).json({
      error:  'Internal server error',
      detail: err.message,
    });
  }
}
