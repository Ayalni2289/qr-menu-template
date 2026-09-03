# QR Menü Şablonu

Sıfır sunucu maliyetli, statik (SSG) Next.js QR menü şablonu. Her müşteri için
tek yapılan iş: `src/config/store.config.ts` + `public/assets` güncelleyip
yeniden deploy etmek.

## Yerelde çalıştırma

```bash
npm install
npm run dev
```

`http://localhost:3000` adresinde açılır.

## Yeni müşteri için özelleştirme

1. `public/assets/logo.png` ve `public/assets/banner.jpg` dosyalarını değiştirin.
2. `src/config/store.config.ts` içindeki `storeConfig` nesnesini güncelleyin
   (işletme bilgisi, iletişim, kategori/ürün listesi).
3. `npm run build` ile statik çıktı `out/` klasöründe oluşur.

## Cloudflare Pages'e deploy

1. Projeyi GitHub'a push edin (veya Wrangler ile doğrudan yükleyin).
2. Cloudflare Pages → "Create a project" → repo'yu seçin.
3. Build ayarları:
   - Build command: `npm run build`
   - Build output directory: `out`
4. Deploy'a basın — her `git push` otomatik yeni yayın tetikler.

Alternatif (CLI ile hızlı deploy, repo gerekmez):

```bash
npm run build
npx wrangler pages deploy out --project-name=musteri-adi-menu
```

## Vercel'e deploy

```bash
npm install -g vercel
vercel
```

`next.config.js` içindeki `output: "export"` sayesinde Vercel de projeyi
statik olarak servis eder — sunucu/serverless fonksiyon maliyeti oluşmaz.
İsterseniz Vercel'in görsel optimizasyonundan yararlanmak için `output: "export"`
satırını kaldırıp `images.unoptimized` değerini `false` yapabilirsiniz (bu durumda
Cloudflare Pages statik export uyumluluğu biter, sadece Vercel için geçerli olur).

## Yeni satış için checklist

- [ ] `store.config.ts` güncellendi
- [ ] Logo + banner değiştirildi
- [ ] Wi-Fi, telefon, Instagram, harita linki kontrol edildi
- [ ] `npm run build` hatasız tamamlandı
- [ ] Deploy sonrası mobilde QR ile test edildi
