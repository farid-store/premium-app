export default async function handler(req, res) {
  const BIN_ID = process.env.JSONBIN_BIN_ID;
  const API_KEY = process.env.JSONBIN_API_KEY;

  // Endpoint JSONBin
  const url = `https://api.jsonbin.io/v3/b/${BIN_ID}`;

  if (req.method === 'GET') {
    try {
      const response = await fetch(url, {
        headers: {
          'X-Master-Key': API_KEY
        }
      });
      const data = await response.json();
      
      // Kirim data langsung ke frontend
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: 'Gagal mengambil data produk' });
    }
  } 
  else if (req.method === 'PUT') {
    // Khusus untuk Admin: Menyimpan pembaruan ke JSONBin
    try {
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-Master-Key': API_KEY
        },
        body: JSON.stringify(req.body)
      });
      const data = await response.json();
      res.status(200).json({ success: true, data });
    } catch (error) {
      res.status(500).json({ error: 'Gagal menyimpan pembaruan' });
    }
  } 
  else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
