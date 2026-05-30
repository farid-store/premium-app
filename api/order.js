export default async function handler(req, res) {
    if (req.method !== 'POST') {
        res.setHeader('Allow', ['POST']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }

    const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
    const CHAT_ID = process.env.TELEGRAM_CHAT_ID;
    const { message } = req.body;

    if (!BOT_TOKEN || !CHAT_ID || !message) {
        return res.status(400).json({ error: 'Parameter tidak lengkap atau konfigurasi server kosong.' });
    }

    try {
        const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: CHAT_ID,
                text: message,
                parse_mode: 'Markdown'
            })
        });

        const data = await response.json();
        if (data.ok) {
            return res.status(200).json({ success: true });
        } else {
            return res.status(400).json({ error: 'Telegram API Error' });
        }
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}
