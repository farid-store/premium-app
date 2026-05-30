export default async function handler(req, res) {
    const BIN_ID = process.env.JSONBIN_BIN_ID;
    const API_KEY = process.env.JSONBIN_API_KEY;

    if (!BIN_ID || !API_KEY) {
        return res.status(500).json({ error: 'Konfigurasi server belum lengkap (Environment Variables kosong).' });
    }

    // Ambil Data Produk (GET)
    if (req.method === 'GET') {
        try {
            const response = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}/latest`, {
                method: 'GET',
                headers: { 'X-Master-Key': API_KEY }
            });
            if (!response.ok) throw new Error('Gagal fetch dari JSONBin');
            
            const data = await response.json();
            return res.status(200).json(data.record);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    } 
    
    // Update Data Produk (PUT)
    else if (req.method === 'PUT') {
        try {
            const response = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Master-Key': API_KEY
                },
                body: JSON.stringify(req.body)
            });
            if (!response.ok) throw new Error('Gagal mengupdate JSONBin');

            return res.status(200).json({ success: true });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    } 
    
    else {
        res.setHeader('Allow', ['GET', 'PUT']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
