// File: api/products.js

export default async function handler(req, res) {
  // ==========================================
  // HARDCODED API KEYS (PASTIKAN REPO PRIVATE)
  // ==========================================
  const JSONBIN_API_KEY = "MASUKKAN_API_KEY_JSONBIN_ANDA_DISINI";
  const JSONBIN_BIN_ID = "MASUKKAN_BIN_ID_ANDA_DISINI";
  
  const BIN_URL = `https://api.jsonbin.io/v3/b/${JSONBIN_BIN_ID}`;

  // MENANGANI METODE GET (Mengambil Data)
  if (req.method === 'GET') {
    try {
      const response = await fetch(BIN_URL, {
        headers: {
          'X-Master-Key': JSONBIN_API_KEY
        }
      });
      
      if (!response.ok) throw new Error(`HTTP Error ${response.status}`);
      
      const data = await response.json();
      return res.status(200).json(data);
    } catch (error) {
      console.error("GET Error:", error.message);
      return res.status(500).json({ error: error.message });
    }
  }

  // MENANGANI METODE PUT (Menyimpan Data dari Admin Panel)
  if (req.method === 'PUT') {
    try {
      const response = await fetch(BIN_URL, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-Master-Key': JSONBIN_API_KEY
        },
        body: JSON.stringify(req.body)
      });
      
      if (!response.ok) throw new Error(`HTTP Error ${response.status}`);
      
      const data = await response.json();
      return res.status(200).json({ success: true, data });
    } catch (error) {
      console.error("PUT Error:", error.message);
      return res.status(500).json({ error: error.message });
    }
  }

  // Jika method bukan GET atau PUT
  return res.status(405).json({ error: 'Method not allowed' });
}
