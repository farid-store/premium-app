// Data produk Anda (tetap sama)
const products = [
    // --- Kategori APLIKASI & JASA (Applications & Services) ---

    // AI & Productivity Tools
    {
        name: "AI CHAT GPT+",
        category: "APLIKASI & JASA",
        status: "✅", // Stok Ready
        harga: [
            { name: "Share (7 Hari)", periode: "7 Hari", harga: 10000, note: "Sharing akun dari saya, login 1 device" },
            { name: "Share (1 Bulan)", periode: "1 Bulan", harga: 20000, note: "Sharing akun dari saya, login 1 device" },
            { name: "Private (1 Bulan)", periode: "1 Bulan", harga: 25000, note: "Private akun dari saya, plan plus team, akses di workplace privasi aman" }
        ],
        description: "Langganan AI CHAT GPT+.",
        note: "FULL GARANSI BF / DISABLE",
        keywords: ["ai chat gpt+", "chat gpt+", "gpt+", "ai gpt", "gpt", "chatgpt"]
    },
    {
        name: "AI CLAUDE",
        category: "APLIKASI & JASA",
        status: "✅",
        harga: [
            { name: "AI CLAUDE (7 Hari)", periode: "7 Hari", harga: 30000 },
            { name: "AI CLAUDE (1 Bulan)", periode: "1 Bulan", harga: 65000 }
        ],
        description: "Langganan AI CLAUDE.",
        note: "FULL GARANSI",
        keywords: ["ai claude", "claude"]
    },
    {
        name: "AI GEMINI ADVANCE",
        category: "APLIKASI & JASA",
        status: "✅",
        harga: [
            { name: "AI GEMINI ADVANCE (1 Bulan)", periode: "1 Bulan", harga: 20000 }
        ],
        description: "Langganan AI GEMINI ADVANCE.",
        note: "FULL GARANSI",
        keywords: ["ai gemini advance", "gemini advance", "gemini ai"]
    },
    {
        name: "AI PERPLEXITY",
        category: "APLIKASI & JASA",
        status: "⌛",
        harga: [],
        description: "Langganan AI PERPLEXITY.",
        note: "Kosong - Belum diupdate",
        keywords: ["ai perplexity", "perplexity"]
    },
    {
        name: "AI YOU.COM",
        category: "APLIKASI & JASA",
        status: "⌛",
        harga: [],
        description: "Langganan AI YOU.COM.",
        note: "Kosong - Belum diupdate",
        keywords: ["ai you.com", "you.com"]
    },
    {
        name: "ALIGHT MOTION PRO",
        category: "APLIKASI & JASA",
        status: "✅",
        harga: [
            { name: "Alight Motion Pro (1 Hari)", periode: "1 Hari", harga: 2000 },
            { name: "Alight Motion Pro (1 Bulan)", periode: "1 Bulan", harga: 6000 },
            { name: "Alight Motion Pro (1 Tahun)", periode: "1 Tahun", harga: 10000 }
        ],
        description: "Aplikasi editing video Alight Motion Pro.",
        note: "FULL GARANSI",
        keywords: ["alight motion pro", "alight motion", "am pro", "am"]
    },
    {
        name: "AMAZON PRIME VIDEO",
        category: "APLIKASI & JASA",
        status: "✅",
        harga: [
            { name: "Amazon Prime Video (1 Bulan)", periode: "1 Bulan", harga: 21000 }
        ],
        description: "Langganan Amazon Prime Video.",
        note: "FULL GARANSI",
        keywords: ["amazon prime video", "prime video", "amazon video"]
    },
    {
        name: "APPLE CODE REDEEM ID",
        category: "APLIKASI & JASA",
        status: "⌛",
        harga: [],
        description: "Code Redeem Apple ID.",
        note: "Kosong - Belum diupdate",
        keywords: ["apple code redeem id", "apple redeem", "redeem id apple"]
    },
    {
        name: "APPLE MUSIC",
        category: "APLIKASI & JASA",
        status: "✅",
        harga: [
            { name: "Apple Music (1 Bulan)", periode: "1 Bulan", harga: 6000 }
        ],
        description: "Langganan Apple Music.",
        note: "FULL GARANSI",
        keywords: ["apple music"]
    },
    {
        name: "BSTATION PREMIUM",
        category: "APLIKASI & JASA",
        status: "✅",
        harga: [
            { name: "BStation Premium (1 Bulan)", periode: "1 Bulan", harga: 18000 }
        ],
        description: "Langganan BStation Premium.",
        note: "FULL GARANSI",
        keywords: ["bstation premium", "bstation"]
    },
    {
        name: "CANVA PRO",
        category: "APLIKASI & JASA",
        status: "✅",
        harga: [
            { name: "Canva Pro (1 Bulan)", periode: "1 Bulan", harga: 3000, note: "via invite (cantumkan email Canva Anda saat pembelian)" },
            { name: "Canva Pro (12 Bulan)", periode: "12 Bulan", harga: 17000, note: "via invite (cantumkan email Canva Anda saat pembelian)" },
            { name: "Canva Pro (Lifetime)", periode: "Lifetime", harga: 30000, note: "via invite (cantumkan email Canva Anda saat pembelian)" },
            { name: "Canva Pro + Designer (1 Bulan)", periode: "1 Bulan", harga: 5000, note: "Bisa akses brandkit, upload font, dll; HANYA TERSEDIA UNTUK DURASI 1 BULAN" },
            { name: "Canva Pro + Owner (1 Bulan)", periode: "1 Bulan", harga: 8000, note: "Akun owner dari saya, bisa invite 100 member, cocok untuk reseller / kebutuhan grup" }
        ],
        description: "Langganan Canva Pro untuk desain grafis profesional.",
        note: "SEMUA FULL GARANSI",
        keywords: ["canva pro", "canva"]
    },
    {
        name: "CAPCUT PRO",
        category: "APLIKASI & JASA",
        status: "✅",
        harga: [
            { name: "CapCut Pro (7 Hari)", periode: "7 Hari", harga: 8000 },
            { name: "CapCut Pro (1 Bulan - 1 Device)", periode: "1 Bulan", harga: 15000 },
            { name: "CapCut Pro (1 Bulan - 3 Device)", periode: "1 Bulan", harga: 19000 }
        ],
        description: "Aplikasi editing video CapCut Pro.",
        note: "FULL GARANSI",
        keywords: ["capcut pro", "capcut"]
    },
    {
        name: "CEK PLAGIASI - TURNITIN",
        category: "APLIKASI & JASA",
        status: "⌛",
        harga: [],
        description: "Layanan cek plagiasi dengan Turnitin.",
        note: "Kosong - Belum diupdate",
        keywords: ["cek plagiasi", "turnitin", "plagiasi turnitin"]
    },
    {
        name: "DEEPL PREMIUM",
        category: "APLIKASI & JASA",
        status: "✅",
        harga: [
            { name: "DeepL Premium (1 Hari)", periode: "1 Hari", harga: 3000 },
            { name: "DeepL Premium (7 Hari)", periode: "7 Hari", harga: 9000 },
            { name: "DeepL Premium (1 Bulan)", periode: "1 Bulan", harga: 23000 },
            { name: "DeepL Premium (3 Bulan)", periode: "3 Bulan", harga: 56000 },
            { name: "DeepL Premium (1 Tahun)", periode: "1 Tahun", harga: 200000 }
        ],
        description: "Langganan DeepL Premium untuk terjemahan profesional.",
        note: "FULL GARANSI",
        keywords: ["deepl premium", "deepl"]
    },
    {
        name: "DISNEY+ HOTSTAR",
        category: "APLIKASI & JASA",
        status: "⌛",
        harga: [
            { name: "Disney+ Hotstar (1 Bulan)", periode: "1 Bulan", harga: 18000 }
        ],
        description: "Langganan Disney+ Hotstar.",
        note: "FULL GARANSI",
        keywords: ["disney+ hotstar", "disney hotstar", "disney+", "hotstar"]
    },
    {
        name: "DRAMABOX PREMIUM",
        category: "APLIKASI & JASA",
        status: "✅",
        harga: [
            { name: "DramaBox Premium (1 Hari)", periode: "1 Hari", harga: 2000 },
            { name: "DramaBox Premium (7 Hari)", periode: "7 Hari", harga: 6000 },
            { name: "DramaBox Premium (1 Bulan)", periode: "1 Bulan", harga: 17000 },
            { name: "DramaBox Premium (3 Bulan)", periode: "3 Bulan", harga: 46000 },
            { name: "DramaBox Premium (1 Tahun)", periode: "1 Tahun", harga: 160000 }
        ],
        description: "Langganan DramaBox Premium.",
        note: "FULL GARANSI",
        keywords: ["dramabox premium", "dramabox"]
    },
    {
        name: "DUOLINGO SUPER",
        category: "APLIKASI & JASA",
        status: "✅",
        harga: [
            { name: "Duolingo Super (7 Hari)", periode: "7 Hari", harga: 8000 },
            { name: "Duolingo Super (1 Bulan)", periode: "1 Bulan", harga: 12000 }
        ],
        description: "Langganan Duolingo Super.",
        note: "FULL GARANSI",
        keywords: ["duolingo super", "duolingo"]
    },
    {
        name: "FIGMA PRO",
        category: "APLIKASI & JASA",
        status: "✅",
        harga: [
            { name: "Private Edu", periode: "Lifetime", harga: 50000 }
        ],
        description: "Langganan Figma Pro untuk desain UI/UX.",
        note: "FULL GARANSI 1 Tahun, Akun private dari saya.",
        keywords: ["figma pro", "figma"]
    },
    {
        name: "GETCONTACT PREMIUM",
        category: "APLIKASI & JASA",
        status: "✅",
        harga: [
            { name: "Getcontact Premium (1 Bulan)", periode: "1 Bulan", harga: 15000 }
        ],
        description: "Langganan Getcontact Premium untuk identifikasi penelepon.",
        note: "FULL GARANSI",
        keywords: ["getcontact premium", "getcontact"]
    },
    {
        name: "GOOGLE DRIVE",
        category: "APLIKASI & JASA",
        status: "✅",
        harga: [
            { name: "Google Drive (1 Bulan)", periode: "1 Bulan", harga: 20000 }
        ],
        description: "Penyimpanan Google Drive.",
        note: "FULL GARANSI",
        keywords: ["google drive", "gdrive", "drive"]
    },
    {
        name: "GOOGLE MEET",
        category: "APLIKASI & JASA",
        status: "✅",
        harga: [
            { name: "Google Meet (1 Bulan)", periode: "1 Bulan", harga: 20000 }
        ],
        description: "Akses Google Meet premium.",
        note: "FULL GARANSI",
        keywords: ["google meet", "gmeet", "meet"]
    },
    {
        name: "GOOGLE ONE",
        category: "APLIKASI & JASA",
        status: "✅",
        harga: [
            { name: "Google One (100GB)", periode: "1 Bulan", harga: 20000 },
            { name: "Google One (200GB)", periode: "1 Bulan", harga: 35000 }
        ],
        description: "Langganan Google One untuk penyimpanan awan dan fitur premium.",
        note: "FULL GARANSI",
        keywords: ["google one"]
    },
    {
        name: "GOOGLE PHOTOS",
        category: "APLIKASI & JASA",
        status: "✅",
        harga: [
            { name: "Google Photos (1 Bulan)", periode: "1 Bulan", harga: 20000 }
        ],
        description: "Penyimpanan Google Photos.",
        note: "FULL GARANSI",
        keywords: ["google photos", "gphotos", "photos"]
    },
    {
        name: "HBO GO",
        category: "APLIKASI & JASA",
        status: "⌛",
        harga: [],
        description: "Langganan HBO Go.",
        note: "Kosong - Belum diupdate",
        keywords: ["hbo go", "hbo"]
    },
    {
        name: "IQIYI",
        category: "APLIKASI & JASA",
        status: "⌛",
        harga: [],
        description: "Langganan iQIYI.",
        note: "Kosong - Belum diupdate",
        keywords: ["iqiyi"]
    },
    {
        name: "JASA CTP NETFLIX",
        category: "APLIKASI & JASA",
        status: "⌛",
        harga: [],
        description: "Jasa Create New Profile (CTP) Netflix.",
        note: "Kosong - Belum diupdate",
        keywords: ["jasa ctp netflix", "ctp netflix", "create profile netflix"]
    },
    {
        name: "JASPAY",
        category: "APLIKASI & JASA",
        status: "⌛",
        harga: [],
        description: "Layanan pembayaran Jaspay.",
        note: "Kosong - Belum diupdate",
        keywords: ["jaspay"]
    },
    {
        name: "LIGHTROOM PREMIUM",
        category: "APLIKASI & JASA",
        status: "⌛",
        harga: [],
        description: "Langganan Lightroom Premium.",
        note: "Kosong - Belum diupdate",
        keywords: ["lightroom premium", "lightroom"]
    },
    {
        name: "LOKLOK VIP",
        category: "APLIKASI & JASA",
        status: "⌛",
        harga: [],
        description: "Langganan LokLok VIP.",
        note: "Kosong - Belum diupdate",
        keywords: ["loklok vip", "loklok"]
    },
    {
        name: "MEITU VIP",
        category: "APLIKASI & JASA",
        status: "⌛",
        harga: [],
        description: "Langganan Meitu VIP.",
        note: "Kosong - Belum diupdate",
        keywords: ["meitu vip", "meitu"]
    },
    {
        name: "MICROSOFT 365",
        category: "APLIKASI & JASA",
        status: "⌛",
        harga: [],
        description: "Langganan Microsoft 365.",
        note: "Kosong - Belum diupdate",
        keywords: ["microsoft 365", "office 365"]
    },
    {
        name: "MIDJOURNEY",
        category: "APLIKASI & JASA",
        status: "✅",
        harga: [
            { name: "Midjourney (1 Bulan)", periode: "1 Bulan", harga: 60000 }
        ],
        description: "Langganan Midjourney untuk menghasilkan gambar berbasis AI.",
        note: "FULL GARANSI",
        keywords: ["midjourney"]
    },
    {
        name: "NETFLIX PREMIUM UHD",
        category: "APLIKASI & JASA",
        status: "✅",
        harga: [
            { name: "Sharing (1P1U)", periode: "1 Bulan", harga: 30000, note: "Login 1 Device, TERLARIS" },
            { name: "Semi-Private", periode: "1 Bulan", harga: 43000, note: "Login 2 Device, MODE SULTAN" },
            { name: "Private", periode: "1 Bulan", harga: 110000, note: "PALING UNTUNG! (Harga lama ~Rp. 110.000~)" }
        ],
        description: "Langganan Netflix Premium UHD.",
        note: "\n\n> 1P1U = 1 Profile 1 User; Akun share berisi 5 Profile -- masing-masing digunakan oleh 1 user, tiap user max login 1 device, terlaris dan hampir gak pernah limit 🔥\n\n> Family Head = akun kepala keluarga dari saya (bisa invite 5 member); Tidak bisa diperpanjang; Habis = Ganti akun\n\n> Individual Plan = akun tipe Individu dari saya; Durasi sesuai yang tertera dan tidak bisa diperpanjang; Habis = Ganti akun\n\n> Mix Plan = akun tipe Individu dari saya; Durasi 1 bulan kemudian diperpanjang via invite sesuai durasi pembelian; Saat habis bisa diperpanjang terus tanpa batas",
        keywords: ["netflix premium uhd", "netflix premium", "netflix uhd", "netflix"]
    },
    {
        name: "OTP (ONE-TIME PASSWORD) 🇮🇩",
        category: "APLIKASI & JASA",
        status: "⌛",
        harga: [],
        description: "Layanan OTP (One-Time Password) untuk Indonesia.",
        note: "Kosong - Belum diupdate",
        keywords: ["otp", "one-time password"]
    },
    {
        name: "PICSART PRO",
        category: "APLIKASI & JASA",
        status: "⌛",
        harga: [],
        description: "Langganan PicsArt Pro.",
        note: "Kosong - Belum diupdate",
        keywords: ["picsart pro", "picsart"]
    },
    {
        name: "PREMIUM GRAMMARLY",
        category: "APLIKASI & JASA",
        status: "✅",
        harga: [
            { name: "Premium Grammarly (1 Bulan)", periode: "1 Bulan", harga: 25000 },
            { name: "Premium Grammarly (1 Tahun)", periode: "1 Tahun", harga: 100000 }
        ],
        description: "Langganan Premium Grammarly untuk pengecekan tata bahasa dan ejaan.",
        note: "FULL GARANSI",
        keywords: ["premium grammarly", "grammarly premium", "grammarly"]
    },
    {
        name: "RCTI+ PREMIUM SPORTS",
        category: "APLIKASI & JASA",
        status: "⌛",
        harga: [],
        description: "Langganan RCTI+ Premium Sports.",
        note: "Kosong - Belum diupdate",
        keywords: ["rcti+ premium sports", "rcti+ sports", "rcti+"]
    },
    {
        name: "REMINI PRO",
        category: "APLIKASI & JASA",
        status: "⌛",
        harga: [],
        description: "Langganan Remini Pro.",
        note: "Kosong - Belum diupdate",
        keywords: ["remini pro", "remini"]
    },
    {
        name: "SCRIBD SUBSCRIPTION",
        category: "APLIKASI & JASA",
        status: "⌛",
        harga: [],
        description: "Langganan Scribd.",
        note: "Kosong - Belum diupdate",
        keywords: ["scribd subscription", "scribd"]
    },
    {
        name: "SPOTIFY PREMIUM",
        category: "APLIKASI & JASA",
        status: "✅",
        harga: [
            { name: "Spotify Premium (1 Bulan)", periode: "1 Bulan", harga: 22000 },
            { name: "Spotify Premium (2 Bulan)", periode: "2 Bulan", harga: 37000 }
        ],
        description: "SPOTIFY PREMIUM PRIVATE",
        note: "Private = akun private dari saya, plan family; FULL GARANSI",
        keywords: ["spotify premium", "spotify"]
    },
    {
        name: "TRADING VIEW PREMIUM",
        category: "APLIKASI & JASA",
        status: "✅",
        harga: [
            { name: "TradingView Premium (1 Bulan)", periode: "1 Bulan", harga: 18000, note: "Private = Private akun dari saya;" }
        ],
        description: "Langganan TradingView Premium.",
        note: "NO GARANSI",
        keywords: ["trading view premium", "trading", "trading view"]
    },
    {
        name: "VIDIO PREMIER",
        category: "APLIKASI & JASA",
        status: "✅",
        harga: [
            { name: "Platinum Private (1 Bulan - Mobile)", periode: "1 Bulan", harga: 20000, note: "🔥" },
            { name: "Platinum Private (1 Bulan - All Dev.)", periode: "1 Bulan", harga: 35000 },
            { name: "Platinum Private (12 Bulan - TV)", periode: "12 Bulan", harga: 7000 },
            { name: "Diamond Private (1 Bulan - Mobile)", periode: "1 Bulan", harga: 40000 }
        ],
        description: "Langganan Vidio Premier (Platinum & Diamond).",
        note: "ALL DEV. & MOBILE FULL",
        keywords: ["vidio premier", "vidio"]
    },
    {
        name: "VISION+ / K-VISION SPORT",
        category: "APLIKASI & JASA",
        status: "⌛",
        harga: [],
        description: "Langganan Vision+ / K-Vision Sport.",
        note: "Kosong - Belum diupdate",
        keywords: ["vision+", "k-vision sport", "visionplus"]
    },
    {
        name: "VIU PREMIUM",
        category: "APLIKASI & JASA",
        status: "✅",
        harga: [
            { name: "Viu Premium (1 Bulan)", periode: "1 Bulan", harga: 3000 },
            { name: "Viu Premium (2 Bulan)", periode: "2 Bulan", harga: 5500 },
            { name: "Viu Premium (3 Bulan)", periode: "3 Bulan", harga: 8000 },
            { name: "Viu Premium (6 Bulan)", periode: "6 Bulan", harga: 11000 },
            { name: "Viu Premium (12 Bulan)", periode: "12 Bulan", harga: 19000 }
        ],
        description: "PREMIUM PRIVATE ANTI-LIMIT",
        note: "Private = private akun dari saya, anti-limit, 1080p; SEMUA FULL GARANSI",
        keywords: ["viu premium", "viu"]
    },
    {
        name: "VPN EXPRESS",
        category: "APLIKASI & JASA",
        status: "⌛",
        harga: [],
        description: "Langganan VPN Express.",
        note: "Kosong - Belum diupdate",
        keywords: ["vpn express", "expressvpn"]
    },
    {
        name: "VPN HMA",
        category: "APLIKASI & JASA",
        status: "⌛",
        harga: [],
        description: "Langganan VPN HMA.",
        note: "Kosong - Belum diupdate",
        keywords: ["vpn hma", "hma vpn"]
    },
    {
        name: "VPN SURFSHARK",
        category: "APLIKASI & JASA",
        status: "⌛",
        harga: [],
        description: "Langganan VPN Surfshark.",
        note: "Kosong - Belum diupdate",
        keywords: ["vpn surfshark", "surfshark vpn"]
    },
    {
        name: "WETV VIP",
        category: "APLIKASI & JASA",
        status: "⌛",
        harga: [],
        description: "Langganan WeTV VIP.",
        note: "Kosong - Belum diupdate",
        keywords: ["wetv vip", "wetv"]
    },
    {
        name: "WINK VIP",
        category: "APLIKASI & JASA",
        status: "✅",
        harga: [
            { name: "Wink VIP (1 Bulan)", periode: "1 Bulan", harga: 22000 }
        ],
        description: "Langganan Wink VIP.",
        note: "VIP PRIVATE; FULL GARANSI -- iOS ONLY -- BAHAN SULIT TANYA STOK DULU; Private = akun private dari saya;",
        keywords: ["wink vip", "wink"]
    },
    {
        name: "YOUTUBE & MUSIC PREMIUM",
        category: "APLIKASI & JASA",
        status: "✅",
        harga: [
            { name: "Family Member (1 Bulan)", periode: "1 Bulan", harga: 6000, note: "Pake akunmu, via invite; Bisa perpanjangan tiap bulan di akun yang sama; Order lebih dari 1 bulan kali 6K aja" },
            { name: "Family Member (12 Bulan - PROMO)", periode: "12 Bulan", harga: 40000, note: "🏷 Order 1 Tahun = lebih hemat" },
            { name: "Family Head (1 Bulan)", periode: "1 Bulan", harga: 9000 },
            { name: "Individual Plan (1 Bulan)", periode: "1 Bulan", harga: 8000 },
            { name: "Mix Plan (3 Bulan)", periode: "3 Bulan", harga: 11000 },
            { name: "Mix Plan (6 Bulan)", periode: "6 Bulan", harga: 18000 },
            { name: "Mix Plan (12 Bulan)", periode: "12 Bulan", harga: 29000 }
        ],
        description: "Langganan YouTube & Music Premium.",
        note: "\n\n> Family Member = member family akun dari kamu (via invite); Privasi aman, Family hanya berbagi benefits tidak berbagi riwayat atau preferensi tayangan\n\n> Family Head = akun kepala keluarga dari saya (bisa invite 5 member); Tidak bisa diperpanjang; Habis = Ganti akun\n\n> Individual Plan = akun tipe Individu dari saya; Durasi sesuai yang tertera dan tidak bisa diperpanjang; Habis = Ganti akun\n\n> Mix Plan = akun tipe Individu dari saya; Durasi 1 bulan kemudian diperpanjang via invite sesuai durasi pembelian; Saat habis bisa diperpanjang terus tanpa batas; SEMUA FULL GARANSI",
        keywords: ["youtube & music premium", "youtube premium", "music premium", "youtube", "yt prem", "yt premium"]
    },
    {
        name: "ZOOM PRO",
        category: "APLIKASI & JASA",
        status: "✅",
        harga: [
            { name: "Zoom Pro (14 Hari - 100 Peserta)", periode: "14 Hari", harga: 8000 }
        ],
        description: "Langganan Zoom Pro.",
        note: "FULL GARANSI; Akun dari saya, 100 member, unlimited meeting - co-host - streaming + breakout rooms; Harga harian? Butuh lebih dari 100 peserta? PM saja.",
        keywords: ["zoom pro", "zoom"]
    },

    // --- Kategori SMM (Social Media Marketing) ---
    {
        name: "FACEBOOK - SMM",
        category: "SMM",
        status: "⌛",
        harga: [],
        description: "Layanan SMM untuk Facebook.",
        note: "Kosong - Belum diupdate",
        keywords: ["facebook smm", "fb smm", "smm facebook"]
    },
    {
        name: "INSTAGRAM - SMM",
        category: "SMM",
        status: "⌛",
        harga: [],
        description: "Layanan SMM untuk Instagram.",
        note: "Kosong - Belum diupdate",
        keywords: ["instagram smm", "ig smm", "smm instagram"]
    },
    {
        name: "SHOPEE - SMM",
        category: "SMM",
        status: "⌛",
        harga: [],
        description: "Layanan SMM untuk Shopee Indonesia.",
        note: "Kosong - Belum diupdate",
        keywords: ["shopee smm", "smm shopee"]
    },
    {
        name: "TIKTOK - SMM",
        category: "SMM",
        status: "⌛",
        harga: [],
        description: "Layanan SMM untuk TikTok Indonesia.",
        note: "Kosong - Belum diupdate",
        keywords: ["tiktok smm", "smm tiktok"]
    },
    {
        name: "TOKOPEDIA - SMM",
        category: "SMM",
        status: "⌛",
        harga: [],
        description: "Layanan SMM untuk Tokopedia Indonesia.",
        note: "Kosong - Belum diupdate",
        keywords: ["tokopedia smm", "smm tokopedia"]
    },
    {
        name: "X (TWITTER) - SMM",
        category: "SMM",
        status: "❌",
        harga: [],
        description: "Layanan SMM untuk X (Twitter).",
        note: "Kosong - Belum diupdate",
        keywords: ["x (twitter) smm", "twitter smm", "x smm", "smm twitter"]
    },
    {
        name: "YOUTUBE - SMM",
        category: "SMM",
        status: "⌛",
        harga: [],
        description: "Layanan SMM untuk YouTube.",
        note: "Kosong - Belum diupdate",
        keywords: ["youtube smm", "yt smm", "smm youtube"]
    }
];

// Salin data produk untuk menyimpan harga asli
const originalProducts = JSON.parse(JSON.stringify(products));

function formatRupiah(number) {
    if (typeof number !== 'number') return 'N/A';
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(number);
}

function displayProducts(filteredProducts = products) {
    const container = document.getElementById('product-list-container');
    container.innerHTML = '';

    const groupedProducts = filteredProducts.reduce((acc, product) => {
        if (!acc[product.category]) {
            acc[product.category] = [];
        }
        acc[product.category].push(product);
        return acc;
    }, {});

    for (const category in groupedProducts) {
        const categoryHeader = document.createElement('div');
        categoryHeader.className = 'category-header';
        categoryHeader.innerHTML = `<h2>${category}</h2>`;
        container.appendChild(categoryHeader);

        groupedProducts[category].forEach(product => {
            const card = document.createElement('div');
            card.className = 'card';

            const cardHeader = document.createElement('div');
            cardHeader.className = 'card-header';

            const statusClass = product.status === '✅' ? 'status-ready' :
                                product.status === '⌛' ? 'status-soon' :
                                'status-empty';
            
            cardHeader.innerHTML = `
                <h3>${product.name}
                    <span class="status ${statusClass}">${product.status}</span>
                </h3>
            `;
            card.appendChild(cardHeader);

            const cardBody = document.createElement('div');
            cardBody.className = 'card-body';
            const priceList = document.createElement('ul');
            priceList.className = 'price-list';

            if (product.harga && product.harga.length > 0) {
                product.harga.forEach(priceItem => {
                    const li = document.createElement('li');
                    li.className = 'price-item';
                    const priceValue = formatRupiah(priceItem.harga);
                    li.innerHTML = `
                        <span class="price-name">${priceItem.name}</span>
                        <span class="price-value">${priceValue}</span>
                    `;
                    if (priceItem.note) {
                        li.innerHTML += `<span class="price-note">${priceItem.note}</span>`;
                    }
                    priceList.appendChild(li);
                });
            } else {
                const li = document.createElement('li');
                li.className = 'price-item';
                li.innerHTML = '<span>Data harga tidak tersedia.</span>';
                priceList.appendChild(li);
            }

            cardBody.appendChild(priceList);

            if (product.note) {
                const note = document.createElement('p');
                note.className = 'card-note';
                note.textContent = product.note.trim().replace(/\n/g, ' ');
                cardBody.appendChild(note);
            }

            card.appendChild(cardBody);
            container.appendChild(card);
        });
    }
}

// Fitur Pencarian Dinamis
const searchInput = document.getElementById('search-input');
searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filteredProducts = products.filter(product => {
        const nameMatch = product.name.toLowerCase().includes(searchTerm);
        const categoryMatch = product.category.toLowerCase().includes(searchTerm);
        const keywordsMatch = product.keywords.some(keyword => keyword.toLowerCase().includes(searchTerm));
        return nameMatch || categoryMatch || keywordsMatch;
    });
    displayProducts(filteredProducts);
});

// Fitur Kalkulator Margin
const marginInput = document.getElementById('margin-input');
const applyMarginBtn = document.getElementById('apply-margin-btn');

applyMarginBtn.addEventListener('click', () => {
    const marginPercentage = parseFloat(marginInput.value);

    // Reset ke harga asli jika input kosong atau 0
    if (isNaN(marginPercentage) || marginPercentage === 0) {
        products.forEach((product, index) => {
            if (originalProducts[index].harga.length > 0) {
                product.harga = JSON.parse(JSON.stringify(originalProducts[index].harga));
            }
        });
    } else {
        products.forEach((product, index) => {
            // Menggunakan harga asli dari `originalProducts` untuk perhitungan
            const originalPrices = originalProducts[index].harga;
            if (originalPrices.length > 0) {
                product.harga = originalPrices.map(priceItem => {
                    const newHarga = priceItem.harga * (1 + marginPercentage / 100);
                    return { ...priceItem,
                        harga: Math.round(newHarga)
                    }; // Gunakan Math.round() agar harga tidak berkoma
                });
            }
        });
    }

    // Tampilkan produk dengan harga yang sudah diperbarui
    displayProducts();
});

// Panggil fungsi displayProducts saat halaman pertama kali dimuat
document.addEventListener('DOMContentLoaded', () => {
    displayProducts();
});