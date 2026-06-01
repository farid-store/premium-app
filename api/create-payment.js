// api/create-payment.js 
// Endpoint: POST /api/create-payment
// Dokumentasi resmi: https://docs.duitku.com/api/en

const crypto = require('crypto');

// ─── Baca dari environment variables Vercel ────────────────────────────────
const MERCHANT_CODE = process.env.DUITKU_MERCHANT_CODE;
const API_KEY       = process.env.DUITKU_API_KEY;
const IS_SANDBOX    = process.env.DUITKU_SANDBOX !== 'false';
const STORE_URL     = process.env.STORE_BASE_URL || 'https://premium-app-mu.vercel.app';

// ─── URL endpoint Duitku Pop / Invoice ─────────────────────
const DUITKU_URL = IS_SANDBOX
  ? 'https://sandbox.duitku.com/webapi/api/merchant/createInvoice'
  : 'https://passport.duitku.com/webapi/api/merchant/createInvoice';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!MERCHANT_CODE || !API_KEY) {
    return res.status(500).json({ error: 'Konfigurasi server tidak lengkap.' });
  }

  try {
    const { productName, period, qty, total, contact, email, note, username } = req.body;

    if (!productName || !total || !contact) {
      return res.status(400).json({ error: 'Field productName, total, dan contact wajib diisi.' });
    }

    const paymentAmount = parseInt(total);
    if (isNaN(paymentAmount) || paymentAmount < 1000) {
      return res.status(400).json({ error: 'Nominal tidak valid.' });
    }

    const merchantOrderId = `FS${Date.now()}${Math.floor(1000 + Math.random() * 9000)}`;
    const rawSignature = `${MERCHANT_CODE}${merchantOrderId}${paymentAmount}${API_KEY}`;
    const signature = crypto.createHash('md5').update(rawSignature).digest('hex');

    // ─── SANITASI DATA EKSTREM (Mencegah Duitku Crash) ──────────────────────
    
    // 1. Bersihkan Nama (Hapus simbol, maksimal 20 karakter)
    let rawName = username || contact.split('@')[0] || 'Pelanggan';
    let vaName  = rawName.replace(/[^a-zA-Z0-9 ]/g, '').trim().substring(0, 20);
    if (!vaName) vaName = 'Pelanggan'; // Jaga-jaga jika hasilnya kosong

    // 2. Bersihkan Email
    let customerEmail = email && email.includes('@')
      ? email
      : `${vaName.replace(/\s/g, '').toLowerCase()}@guest.faridstore.id`;

    // 3. Bersihkan Nomor HP (WAJIB ADA ANGKA, minimal 8 digit)
    let phoneNumber = contact.replace(/\D/g, '').substring(0, 15);
    if (phoneNumber.length < 8) {
      phoneNumber = '081111111111'; // Fallback aman untuk Duitku
    }

    const cleanStoreUrl = STORE_URL.replace(/\/$/, '');

    // ─── Build payload ke Duitku ─────────────────────────────────────────────
// ─── Build payload ke Duitku (Mode Bare Minimum Pop UI) ─────────────────
// ─── Build payload ke Duitku (FORMAT CREATE INVOICE VALID) ─────────────────
    const duitkuPayload = {
      merchantCode:    MERCHANT_CODE,
      paymentAmount:   paymentAmount,
      // ⚠️ JANGAN ADA parameter paymentMethod di sini sama sekali!
      merchantOrderId: merchantOrderId,
      productDetails:  `${productName} - ${period || '1 Bulan'} x${parseInt(qty) || 1}`.substring(0, 255),
      additionalParam: note ? note.substring(0, 255) : '',
      merchantUserInfo: (username || 'Guest').substring(0, 255),
      customerVaName:  vaName,
      email:           customerEmail,
      phoneNumber:     phoneNumber,
      itemDetails: [
        {
          name:     `${productName} (${period || '1 Bulan'}) x${parseInt(qty) || 1}`.substring(0, 255),
          price:    paymentAmount, // Pastikan ini integer angka total
          quantity: 1,             // Pastikan ini integer 1
        }
      ],
      callbackUrl:  `${cleanStoreUrl}/api/payment-callback`,
      returnUrl:    `${cleanStoreUrl}/?payment=success&orderId=${merchantOrderId}`,
      signature:    signature,
      expiryPeriod: 60, // expire dalam 60 menit
    };

    console.log('[create-payment] Sending to Duitku:', duitkuPayload);

    const duitkuRes = await fetch(DUITKU_URL, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify(duitkuPayload),
    });

    const duitkuData = await duitkuRes.json();

    if (duitkuData.statusCode !== '00') {
      console.error('[Duitku] Error:', duitkuData);
      return res.status(502).json({
        error:   'Gagal membuat invoice pembayaran.',
        detail:  duitkuData.statusMessage || duitkuData.Message || 'Unknown Duitku error',
      });
    }

    // ─── Simpan order pending ───────────────────────────────────────────────
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
    } catch (dbErr) {
      console.warn('[create-payment] DB save failed:', dbErr.message);
    }

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
