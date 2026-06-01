// api/payment-callback.js
// Endpoint: POST /api/payment-callback
// Duitku memanggil endpoint ini setelah pelanggan berhasil bayar.
// WAJIB membalas HTTP 200 agar Duitku tidak retry callback.

const crypto = require('crypto');

const MERCHANT_CODE = process.env.DUITKU_MERCHANT_CODE;
const API_KEY       = process.env.DUITKU_API_KEY;
const STORE_URL     = process.env.STORE_BASE_URL || 'https://premium-app-mu.vercel.app';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send('Method not allowed');
  }

  try {
    const {
      merchantCode,
      amount,
      merchantOrderId,
      productDetail,
      additionalParam,
      paymentCode,
      resultCode,
      merchantUserId,
      reference,
      signature: receivedSignature,
      publisherOrderId,
      spUserHash,
      settlementDate,
      issuerCode,
    } = req.body;

    console.log('[Callback] Received:', { merchantOrderId, resultCode, amount, reference });

    // ── VALIDASI SIGNATURE ──────────────────────────────────────────────────
    // Formula: MD5(merchantCode + amount + merchantOrderId + apiKey)
    const expectedSignature = crypto
      .createHash('md5')
      .update(`${merchantCode}${amount}${merchantOrderId}${API_KEY}`)
      .digest('hex');

    if (receivedSignature !== expectedSignature) {
      console.error('[Callback] Signature INVALID!', { received: receivedSignature, expected: expectedSignature });
      // Tetap balas 200 agar Duitku stop retry, tapi tidak update status
      return res.status(200).send('OK');
    }

    // ── UPDATE STATUS ORDER ─────────────────────────────────────────────────
    // resultCode: '00' = SUCCESS, '01' = FAILED, '02' = PENDING
    const isSuccess = resultCode === '00';
    const newStatus = isSuccess ? 'lunas' : (resultCode === '01' ? 'batal' : 'pending');

    try {
      const dbRes  = await fetch(`${STORE_URL}/api/products`);
      const dbData = await dbRes.json();
      const payload = dbData.record ? dbData.record : dbData;

      if (payload.orders && Array.isArray(payload.orders)) {
        const orderIndex = payload.orders.findIndex(
          o => o.merchantOrderId === merchantOrderId || o.duitkuReference === reference
        );

        if (orderIndex !== -1) {
          payload.orders[orderIndex].status          = newStatus;
          payload.orders[orderIndex].duitkuReference = reference;
          payload.orders[orderIndex].paymentCode      = paymentCode || '';
          payload.orders[orderIndex].paidAt           = isSuccess
            ? new Date().toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' }) + ' WIB'
            : null;

          await fetch(`${STORE_URL}/api/products`, {
            method:  'PUT',
            headers: { 'Content-Type': 'application/json' },
            body:    JSON.stringify(payload),
          });

          console.log(`[Callback] Order ${merchantOrderId} updated → ${newStatus}`);
        } else {
          console.warn('[Callback] Order tidak ditemukan:', merchantOrderId);
        }
      }
    } catch (dbErr) {
      console.error('[Callback] DB Error:', dbErr.message);
      // Tetap balas 200 agar Duitku tidak retry terus
    }

    // ── WAJIB BALAS HTTP 200 ────────────────────────────────────────────────
    return res.status(200).send('OK');

  } catch (err) {
    console.error('[payment-callback] Error:', err);
    // Tetap balas 200
    return res.status(200).send('OK');
  }
}
