// api/create-payment.js
// Endpoint: POST /api/create-payment
// Menerima data order dari frontend, membuat invoice ke Duitku,
// dan mengembalikan paymentUrl untuk redirect pelanggan.

const crypto = require('crypto');

const MERCHANT_CODE = process.env.DUITKU_MERCHANT_CODE;
const API_KEY       = process.env.DUITKU_API_KEY;
const BASE_URL      = process.env.DUITKU_BASE_URL || 'https://sandbox.duitku.com/webapi';
const STORE_URL     = process.env.STORE_BASE_URL  || 'https://premium-app-mu.vercel.app';

export default async function handler(req, res) {
  // Hanya terima POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const {
      productName,
      period,
      qty,
      total,
      contact,
      email,
      note,
      username,
    } = req.body;

    // Validasi field wajib
    if (!productName || !total || !contact) {
      return res.status(400).json({ error: 'Field productName, total, dan contact wajib diisi.' });
    }

    // Buat merchantOrderId unik: timestamp + 4 digit random
    const merchantOrderId = `FS${Date.now()}${Math.floor(1000 + Math.random() * 9000)}`;

    // Signature: MD5(merchantCode + merchantOrderId + paymentAmount + apiKey)
    const signature = crypto
      .createHash('md5')
      .update(`${MERCHANT_CODE}${merchantOrderId}${total}${API_KEY}`)
      .digest('hex');

    // Nama pelanggan dari kontak (fallback)
    const customerName = username || contact.split('@')[0] || 'Pelanggan';
    
    // Fallback AMAN untuk mencegah error "An error has occurred" dari Duitku
    const safeEmail = email || 'guest@faridstore.id';
    const safePhone = contact.replace(/\D/g, '').substring(0, 15) || '081111111111';

    // Body request ke Duitku
    const duitkuPayload = {
      merchantCode:    MERCHANT_CODE,
      paymentAmount:   parseInt(total),
      merchantOrderId: merchantOrderId,
      productDetails:  `${productName} - ${period || '1 Bulan'} x${qty || 1}`,
      additionalParam: note || '',
      merchantUserInfo: username || 'Guest',
      customerVaName:  customerName.substring(0, 20),
      email:           safeEmail,
      phoneNumber:     safePhone,
      itemDetails: [
        {
          // Trik: Satukan qty ke dalam nama, lalu hitung sebagai 1 item besar
          // Ini mencegah error matematis pembagian desimal oleh sistem Duitku
          name:     `${productName} (${period || '1 Bulan'} x${qty || 1})`,
          price:    parseInt(total),
          quantity: 1, 
        }
      ],
      customerDetail: {
        firstName:   customerName.substring(0, 50),
        lastName:    'User', // Duitku sangat rewel kalau ini dikosongkan ('')
        email:       safeEmail,
        phoneNumber: safePhone,
      },
      callbackUrl:   `${STORE_URL}/api/payment-callback`,
      returnUrl:     `${STORE_URL}/?payment=success&orderId=${merchantOrderId}`,
      signature:     signature,
      expiryPeriod:  60, // expire dalam 60 menit
    };

    // Kirim request ke endpoint Duitku Pop (createInvoice)
    const duitkuRes = await fetch(`${BASE_URL}/api/merchant/createInvoice`, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify(duitkuPayload),
    });

    const duitkuData = await duitkuRes.json();

    // Cek response
    if (!duitkuRes.ok || duitkuData.statusCode !== '00') {
      console.error('[Duitku] Error:', duitkuData);
      return res.status(502).json({
        error:   'Gagal membuat invoice pembayaran.',
        detail:  duitkuData.statusMessage || 'Unknown error',
      });
    }

    // Simpan order pending ke database kamu (opsional, recommended)
    // Panggil /api/products untuk simpan order baru dengan status 'pending'
    try {
      const dbRes  = await fetch(`${STORE_URL}/api/products`);
      const dbData = await dbRes.json();
      const payload = dbData.record ? dbData.record : dbData;

      if (!payload.orders) payload.orders = [];
      payload.orders.push({
        merchantOrderId,
        duitkuReference: duitkuData.reference,
        orderDate:       new Date().toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' }) + ' WIB',
        username:        username || 'Guest',
        contact,
        productName,
        period:          period || '1 Bulan',
        qty:             parseInt(qty) || 1,
        total:           parseInt(total),
        status:          'pending',
        note:            note || '',
        paymentMethod:   'Duitku',
      });

      await fetch(`${STORE_URL}/api/products`, {
        method:  'PUT',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(payload),
      });
    } catch (dbErr) {
      // DB error tidak block pembayaran, cukup log
      console.warn('[DB] Gagal simpan order awal:', dbErr.message);
    }

    // Kembalikan paymentUrl ke frontend
    return res.status(200).json({
      success:        true,
      paymentUrl:     duitkuData.paymentUrl,
      reference:      duitkuData.reference,
      merchantOrderId,
    });

  } catch (err) {
    console.error('[create-payment] Error:', err);
    return res.status(500).json({ error: 'Internal server error', detail: err.message });
  }
}
