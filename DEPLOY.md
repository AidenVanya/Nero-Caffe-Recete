# Nero Caffè — Paylaşımlı Panel Kurulumu

Artık panelden yaptığınız her değişiklik **herkeste** görünür. Bunun için site,
tek HTML dosyası yerine küçük bir **klasör** olarak yayınlanmalı (içinde küçük bir
sunucu fonksiyonu + ayarlar var). Hepsini hazırladım; sizin yapmanız gereken tek
seferlik bir kurulum.

> **Önemli:** Kurulumdan sonra içerik eklemek/silmek/düzenlemek için bir daha
> dosya yüklemeniz **gerekmez**. Her şey paneldedir ve otomatik olarak herkese
> kaydedilir.

---

## Klasörde neler var?

| Dosya | Görevi |
|------|--------|
| `cafe-recete-rehberi.html` | Menü + yönetim paneli (görünen site) |
| `netlify/functions/recipes.mjs` | Reçeteleri herkes için saklayan/sunan küçük fonksiyon |
| `netlify.toml` | Netlify ayarları (kök adres + fonksiyon klasörü) |
| `package.json` | Fonksiyonun ihtiyacı olan paket bilgisi |
| `node_modules/` | O paketin kendisi (hazır kuruldu) |

---

## Yöntem A — GitHub'a bağla (ÖNERİLEN, en sağlam)

Sürükle-bırak fonksiyonları her zaman güvenilir kurmaz. En garantili ve tek
seferlik yol bu:

1. **github.com**'da ücretsiz hesap açın (yoksa).
2. Yeni bir depo (repository) oluşturun, örn. `nero-caffe`.
3. Bu klasördeki dosyaları o depoya yükleyin (GitHub web arayüzünde
   "Add file → Upload files" ile sürükleyebilirsiniz).
   - **`node_modules` klasörünü yüklemeyin** — Netlify onu kendi kurar.
4. **app.netlify.com → Add new site → Import an existing project → GitHub**
   ile bu depoyu seçin. Ayarları otomatik okur, "Deploy" deyin.
5. Bitti. Bundan sonra panelde yaptığınız her şey anında herkese yansır.

> İleride menü/tasarımda kod değişikliği gerekirse dosyayı GitHub'da güncellersiniz,
> Netlify otomatik yeniden yayınlar. **İçerik (reçete) değişiklikleri için bu gerekmez.**

---

## Yöntem B — Sürükle-bırak (Git istemiyorsanız)

1. Bu klasörün **tamamını** (içindeki `node_modules` dahil) tek bir **ZIP**
   yapın.
2. **app.netlify.com/drop** adresine bu ZIP'i sürükleyin
   (veya mevcut sitede **Deploys** sekmesine sürükleyin).
3. Yayınlandıktan sonra **Functions** sekmesinde `recipes` görünüyorsa her şey tamam.

> Eğer Functions sekmesinde fonksiyon görünmüyorsa, sürükle-bırak onu paketleyememiş
> demektir — bu durumda **Yöntem A**'ya geçin (en sağlam çözüm odur).

---

## Şifreyi güçlendirin (önerilir)

Varsayılan panel şifresi `nero2026`. Gerçek koruma için Netlify'da bir ortam
değişkeni tanımlayın:

1. Netlify → siteniz → **Site configuration → Environment variables**.
2. **Add a variable**: anahtar `ADMIN_PASSWORD`, değer = istediğiniz yeni şifre.
3. Kaydedin ve siteyi yeniden yayınlayın (**Deploys → Trigger deploy**).

Artık panel bu yeni şifreyi sunucuda doğrular. (Ortam değişkeni yoksa `nero2026`
geçerlidir.)

---

## Nasıl çalışıyor? (kısa)

- Sayfa açılınca menü **anında yerel kopyadan** çizilir, sonra arka planda
  sunucudan **paylaşımlı kopya** çekilip güncellenir.
- Panelde şifre **sunucuda** doğrulanır.
- Ekle / düzenle / sil / içe aktar / varsayılana dön işlemleri, listeyi
  **herkes için** sunucuya (Netlify Blobs) yazar. Ekranın altında
  "Herkese kaydedildi ✓" yazısı görürsünüz.
- Sunucuya ulaşılamazsa (çevrimdışı veya fonksiyon yoksa) panel yine çalışır ama
  değişiklik **yalnız o cihazda** kalır ("yalnız bu cihaz" uyarısı çıkar).

Netlify Blobs ek hesap/kurulum istemez; fonksiyon ilk yazdığında otomatik etkinleşir.
