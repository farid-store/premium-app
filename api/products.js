export default async function handler(req, res) {
  // ==========================================
  // HARDCODED API KEYS (PASTIKAN REPO PRIVATE)
  // ==========================================
  const JSONBIN_API_KEY = "$2a$10$tcKHEWwuz2sqRoMCKJfga.1xxTFW0RxpXUPnP.NI4YbivtlK1xxau";
  const JSONBIN_BIN_ID = "6a1a841eddf5aa59f7777a2a";
  
  const BIN_URL = `https://api.jsonbin.io/v3/b/${JSONBIN_BIN_ID}`;

  // 1. MENANGANI METODE GET (Mengambil Data)
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

  // 2. MENANGANI METODE PUT (Menyimpan Data dari Admin Panel)
  if (req.method === 'PUT') {
    try {
      const response = await fetch(BIN_URL, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-Master-Key': JSONBIN_API_KEY,
          'X-Bin-Versioning': 'false' // <-- KUNCI PENTING: Matikan versioning agar tidak kena limit gratisan
        },
        body: JSON.stringify(req.body)
      });
      
      // Tangkap error spesifik dari JSONBin jika gagal
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`JSONBin Error ${response.status}: ${errorText}`);
      }
      
      const data = await response.json();
      return res.status(200).json({ success: true, data });
    } catch (error) {
      console.error("PUT Error:", error.message);
      return res.status(500).json({ success: false, error: error.message });
    }
  }

  // Jika method bukan GET atau PUT
  return res.status(405).json({ error: 'Method not allowed' });
}


