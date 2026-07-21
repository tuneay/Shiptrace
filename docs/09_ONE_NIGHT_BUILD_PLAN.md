# 09 — One-Night Build Plan

## Ana kural

Bu gece hedef “çok özellikli ürün” değil, baştan sona çalışan ve paylaşılmaya değer tek bir akıştır.

Her faz sonunda uygulama çalışır durumda kalmalıdır.

## Faz 0 — Kapsam kilidi

- [ ] `README.md` oku
- [ ] `AGENTS.md` oku
- [ ] Scope dışı özellikleri issue olarak bile açma
- [ ] Tek provider seç
- [ ] Supabase projesi oluştur
- [ ] GitHub token hazırla
- [ ] Vercel projesi oluştur

Çıkış kriteri:

> Teknik kararlar sabit ve ortam değişkenleri hazır.

## Faz 1 — Foundation

- [ ] Next.js scaffold
- [ ] Geist fontları
- [ ] Global renk tokenları
- [ ] Layout
- [ ] Navbar
- [ ] Hero
- [ ] Repo input
- [ ] Period selector
- [ ] Statik receipt preview
- [ ] Responsive temel

Çıkış kriteri:

> Landing mobil ve desktop üzerinde premium görünür.

## Faz 2 — GitHub pipeline

- [ ] Repo URL parser
- [ ] Zod input schema
- [ ] Repo metadata fetch
- [ ] Commit fetch
- [ ] Tarih filtreleme
- [ ] Commit normalization
- [ ] Gürültü işaretleme
- [ ] GitHub hata mapping

Çıkış kriteri:

> Public bir repo için normalize commit JSON'u üretilebiliyor.

## Faz 3 — AI analysis

- [ ] Provider adapter
- [ ] System prompt
- [ ] User prompt builder
- [ ] Structured JSON output
- [ ] Zod validation
- [ ] Retry: maksimum 1
- [ ] Deterministic fallback

Çıkış kriteri:

> Commit JSON'u geçerli `TraceAnalysis` çıktısına dönüşüyor.

## Faz 4 — Persistence

- [ ] Supabase schema
- [ ] Insert helper
- [ ] Slug generator
- [ ] Duplicate/cache kontrolü
- [ ] Public select policy
- [ ] Trace fetch helper

Çıkış kriteri:

> Analiz kaydediliyor ve slug ile geri okunuyor.

## Faz 5 — Result page

- [ ] Trace header
- [ ] Summary
- [ ] Metric strip
- [ ] Receipt card
- [ ] Highlights
- [ ] Change groups
- [ ] Commit links
- [ ] Share tools
- [ ] Footer CTA
- [ ] 404 state

Çıkış kriteri:

> Sonuç sayfası tek başına paylaşılmaya değer görünüyor.

## Faz 6 — Share card

- [ ] Dynamic OG route
- [ ] 1200×630 layout
- [ ] Font yükleme
- [ ] Dinamik headline
- [ ] Highlight listesi
- [ ] Metric strip
- [ ] Public URL
- [ ] `og:image` metadata

Çıkış kriteri:

> Trace linki sosyal platformlarda doğru görsel ön izleme üretir.

## Faz 7 — Polish

- [ ] Loading aşamaları
- [ ] Copy button feedback
- [ ] Form validation metinleri
- [ ] Empty state
- [ ] AI fallback etiketi
- [ ] Mobile test
- [ ] Long repo name test
- [ ] 0, 1, 100 commit test
- [ ] Accessibility labels
- [ ] Reduced motion
- [ ] Lighthouse temel kontrol

Çıkış kriteri:

> Ana akışta görünür kırık, taşma veya anlamsız durum yok.

## Faz 8 — Deploy

- [ ] Env değerlerini Vercel'e ekle
- [ ] Production deploy
- [ ] `NEXT_PUBLIC_APP_URL` güncelle
- [ ] Gerçek repo analizi
- [ ] OG card kontrolü
- [ ] Mobil cihazda kontrol
- [ ] Launch trace oluştur

Çıkış kriteri:

> Public URL üzerinden uçtan uca analiz tamamlanıyor.

## Test repoları

En az üç tip repo ile test et:

1. Az commitli kişisel repo
2. Düzenli conventional commit kullanan repo
3. Gürültülü, çok commitli repo

## Son dakika kararları

Zaman daralırsa:

- Commit listesi detayını kapat.
- Stars/forks metriklerini çıkar.
- Landing alt bölümlerini azalt.
- Share card download yerine OG preview bırak.
- Tek sosyal metin üret.

Ama sonucu çirkin veya okunamaz hâlde yayınlama.

## Definition of Done

Shiptrace bu gece tamamlanmış sayılır, eğer:

1. Kullanıcı public repo URL'si girebiliyor.
2. 7 veya 30 gün seçebiliyor.
3. Commitler server üzerinden çekiliyor.
4. AI veya fallback özet üretiyor.
5. Kalıcı public trace açılıyor.
6. Share card doğru render oluyor.
7. Link ve sosyal metin kopyalanabiliyor.
8. Mobilde ana akış kırılmıyor.
9. Production URL'de çalışıyor.
