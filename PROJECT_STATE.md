# Shiptrace — Project State

Bu dosya proje ilerledikçe güncellenir. Kod yazan her insan veya AI, çalışmaya başlamadan önce bu dosyayı okumalıdır.

## Current phase

`DEPLOY_READY`

Olası değerler:

- `NOT_STARTED`
- `FOUNDATION`
- `GITHUB_PIPELINE`
- `AI_ANALYSIS`
- `RESULT_PAGE`
- `SHARE_CARD`
- `PERSISTENCE`
- `POLISH`
- `DEPLOY_READY`
- `DEPLOYED`

## Current objective

Shiptrace MVP'nin tek uçtan uca akışını çalıştırmak:

```text
Public repo URL → 7/30 gün → Analiz → Public trace page → Share card
```

## Completed

- [x] Proje scaffold edildi
- [x] Tasarım tokenları eklendi
- [x] Landing page tamamlandı
- [x] GitHub URL doğrulama tamamlandı
- [x] Commit verisi çekiliyor
- [x] AI analizi çalışıyor
- [x] Fallback özet çalışıyor
- [x] Trace Supabase'e kaydediliyor
- [x] Public trace sayfası açılıyor
- [x] OG/share card üretiliyor
- [x] Copy text butonları çalışıyor
- [x] Mobil görünüm kontrol edildi
- [x] Hata durumları yazıldı
- [x] Production deploy paketi hazır
- [x] Açık kaynak yayın paketi hazır
- [x] Public GitHub repository yayınlandı
- [ ] Production deploy tamamlandı

## Active task

Güvenlik nedeniyle açığa çıkan Groq ve Supabase legacy server anahtarlarını yenileyip yeni Supabase publishable/secret key bağlantısını doğrulamak.

## Decisions

| Tarih | Karar | Gerekçe |
|---|---|---|
| — | Yalnızca public repo | Bir gecelik MVP kapsamını korumak |
| — | Auth yok | Ana değeri test etmek |
| — | 7/30 gün | Kullanıcı karar yükünü azaltmak |
| — | Tek vurgu rengi | Güçlü ve tutarlı marka dili |
| — | Supabase persistence | Public sayfaların kalıcı olması |
| 2026-07-21 | AI sağlayıcısı OpenAI | İlk MVP implementasyonu; aşağıdaki Groq kararıyla değiştirildi |
| 2026-07-21 | Landing formu aynı sayfada ilerleyecek | Daha hızlı ana akış ve daha az client navigasyonu |
| 2026-07-21 | Next.js 16 App Router + Tailwind CSS 4 | Güncel scaffold ve Vercel uyumluluğu |
| 2026-07-21 | GitHub API maksimum 100 commit | Belgedeki token/maliyet sınırını ve bir gecelik kapsamı korumak |
| 2026-07-21 | Gürültülü commitleri silmek yerine işaretle | Önemli maintenance işlerini yanlışlıkla kaybetmemek |
| 2026-07-21 | Groq Responses API + Zod structured outputs | OpenAI-compatible istemciyi koruyarak model çıktısını server tarafında tip güvenli tutmak |
| 2026-07-21 | Varsayılan model `openai/gpt-oss-120b`, env ile değiştirilebilir | Kullanıcı tercihi, güçlü analiz kalitesi ve Groq strict structured-output desteği |
| 2026-07-21 | AI sağlayıcısı OpenAI'dan Groq'a geçirildi | Kullanıcı tercihi; tek provider sınırı korunuyor ve gece hedefi tehlikeye girmiyor. Etkilenenler: `lib/ai`, env, README ve mimari belge |
| 2026-07-21 | İki başarısız provider denemesinden sonra fallback | Kullanıcıyı AI servis hatasında bloklamamak |
| 2026-07-21 | Supabase yazmaları yalnızca service role client ile | Client insert ve secret sızıntısını engellemek |
| 2026-07-21 | Aynı son commit SHA için 10 dakika cache | GitHub/AI maliyetini ve duplicate trace'leri azaltmak |
| 2026-07-21 | Credentials yokken yalnız development memory store | Yerel uçtan uca testi mümkün kılarken production'da Supabase'i zorunlu tutmak |
| 2026-07-21 | Sonuç sayfası server-rendered | Public trace SEO'su, düşük client JS ve hızlı paylaşım önizlemesi |
| 2026-07-21 | Commit detayları native `details` ile kapalı | 100 committe sayfayı boğmadan klavye erişilebilirliği sağlamak |
| 2026-07-21 | Share card ayrı editoryal poster | Sonuç sayfası ekran görüntüsü yerine paylaşımda güçlü bağımsız kompozisyon |
| 2026-07-21 | OG route Node runtime | Supabase server helper ile uyumlu dinamik image üretimi |
| 2026-07-21 | IP başına 5/saat, repo başına 2/10 dk in-memory limit | Basit MVP koruması; serverless dağıtık kesinlik iddiası yok |
| 2026-07-21 | Rate limit yalnız production'da uygulanır | Production korumasını korurken yerel tekrar testlerinin başarısız denemelerle kilitlenmesini önlemek |
| 2026-07-21 | Resmi Vercel deploy yapılmayacak | Kullanıcı projeyi hosted ürün olarak yayınlamayacak; kod yerel çalışan açık kaynak repository olarak paylaşılacak |
| 2026-07-21 | Motion polish açık kaynak paketlemeden önce yapılacak | Görsel kaliteyi mevcut tasarım sistemi içinde tamamlamak; yeni ürün özelliği veya kapsam genişlemesi eklememek |
| 2026-07-21 | `npm audit fix --force` uygulanmadı | Önerilen Next 9 downgrade kırıcı ve güvensiz; transitive PostCSS uyarısı kaydedildi |
| 2026-07-21 | Kod lisansı `AGPL-3.0-only` | Hosted değiştirilmiş sürümlerin de kaynak sunmasını gerektiren güçlü copyleft yaklaşımı; kullanıcı seçimi |
| 2026-07-21 | Marka hakları yazılım lisansından ayrı tutuldu | AGPL kod özgürlüklerini korurken Shiptrace adı, wordmark ve görsel kimliği için yanıltıcı resmî kullanımın önüne geçmek |
| 2026-07-21 | PostCSS `^8.5.20` override ile sabitlendi | Next.js'in bundled 8.4.31 sürümündeki moderate güvenlik kayıtlarını kırıcı downgrade yapmadan gidermek |
| 2026-07-21 | Yeni Supabase publishable/secret key modeli varsayılan | 2026 sonunda kullanım dışı kalacak legacy JWT API key'lerinden önce güvenli ve bağımsız döndürülebilir anahtar modeline geçmek; eski env adları yalnız uyumluluk için destekleniyor |

## Known issues

- Supabase bağlantısı ve gerçek Groq GPT-OSS smoke testi başarılı. GitHub token opsiyonel olarak eksik. Sohbette/diagnostic çıktıda görünen Groq ve Supabase service-role anahtarları public push öncesi yenilenmeli.
- Resmi production deploy kullanıcı kararıyla kapsamdan çıkarıldı; Vercel rehberi yalnız fork sahipleri için opsiyonel tutuluyor.
- Public kaynak repository: `https://github.com/tuneay/Shiptrace`. Resmî hosted instance bulunmuyor.
- In-memory rate limit serverless instance'lar arasında global kesinlik sağlamaz.

## Next task

1. ~~Tasarım sistemi ve reduced-motion kurallarına bağlı bir motion polish geçişi yap.~~ Tamamlandı (Session 11).
2. Groq ve Supabase server secret'larını yenile; `.env.local` dosyasının GitHub'a girmediğini doğrula.
3. ~~Lisans, contribution/security belgeleri ve açık kaynak README düzenini tamamla.~~ Tamamlandı (Session 12).
4. ~~Temiz Git geçmişiyle public GitHub repository'sine push et.~~ Tamamlandı (Session 13).

## Session log

### Session 1

- Başlangıç: `NOT_STARTED`
- Tamamlanan: Next.js scaffold, strict TypeScript, Tailwind tokenları, responsive landing, form durumları, receipt ve example trace.
- Doğrulama: Production build, TypeScript, ESLint, HTTP smoke test; 390px, 768px ve desktop responsive tarayıcı kontrolleri başarılı.
- Değişen kararlar: OpenAI tek sağlayıcı seçildi; kullanıcı akışı landing üzerinde progress state ile devam edecek.
- Açık sorunlar: Henüz gerçek GitHub çağrısı yok; FAZ 2 kapsamı.
- Sonraki adım: `GITHUB_PIPELINE`

### Session 2 — GitHub Pipeline

- Tamamlanan: Desteklenen üç URL formatı, Zod input şeması, GitHub metadata/commit istemcisi, 100 commit sınırı, normalizasyon, aktif gün/katkıcı/metrik hesabı, gürültü işaretleme ve hata eşleme.
- Doğrulama: 4 otomatik test, TypeScript, ESLint ve production build başarılı.
- Gerçek repo testi: `vercel/next.js` için 7 günlük veri server route üzerinden başarıyla normalize edildi.
- Güvenlik: `GITHUB_TOKEN` yalnızca server route tarafından okunuyor; repo içeriği veya diff indirilmiyor.
- Açık sorunlar: AI ve persistence henüz bağlı değil; sırasıyla FAZ 3 ve FAZ 4 kapsamı.
- Sonraki adım: `AI_ANALYSIS`

### Session 3 — AI Analysis

- Tamamlanan: Dokümandaki system prompt, güvenli user prompt builder, OpenAI Responses structured-output adapter, Zod şeması, kategori/highlight/social/status/confidence çıktısı, SHA doğrulama ve kalite filtresi.
- Retry/fallback: Geçersiz veya başarısız provider çıktısı bir kez tekrar deneniyor; ikinci hatada deterministic analyzer devreye giriyor.
- Doğrulama: Feature-heavy, maintenance-only ve prompt-injection içeren listeler dahil 6 AI testi; toplam 10 test, TypeScript, ESLint ve production build başarılı.
- Gerçek repo testi: `vercel/next.js` metadata'sı fallback analyzer ile tam `TraceAnalysis` çıktısına dönüştürüldü.
- Açık sorunlar (tarihsel): İlk OpenAI provider gerçek credential olmadan yalnız fallback ile doğrulandı; Session 9'da Groq ile değiştirildi.
- Sonraki adım: `PERSISTENCE`

### Session 4 — Persistence

- Tamamlanan: `traces` SQL migration, indexler, RLS public select policy, service-role insert, anon read, Zod DB response doğrulama, slug ve public fetch helper.
- Duplicate kontrolü: Aynı owner/repo, dönem ve last commit SHA 10 dakika içinde mevcut trace'i döndürüyor.
- Doğrulama: 3 persistence testi dahil toplam 13 test, TypeScript, ESLint ve production build başarılı.
- Gerçek repo testi: `vercel/next.js` iki kez analiz edildi ve aynı slug döndü.
- Açık sorunlar: Supabase env değerleri bu makinede yok; gerçek remote insert migration uygulandıktan sonra deploy ortamında test edilmeli.
- Sonraki adım: `RESULT_PAGE`

### Session 5 — Result Page

- Tamamlanan: `/t/[slug]`, dinamik metadata/canonical, trace hero, metrics, generated receipt, highlights, change groups, kaynak commitler, share araçları, footer CTA, loading ve özel not-found state.
- Copy: Trace linki, LinkedIn ve X metni clipboard feedback ile kopyalanabiliyor.
- Doğrulama: Gerçek `vercel/next.js` trace'i 200 yanıt verdi; headline, receipt, share, source commits, fallback label ve metadata HTML smoke testleri başarılı.
- Responsive: Receipt ve highlights mobilde tek kolon; metrics 2×2; share ve source alanları tablet/mobil breakpointlerinde tek kolon.
- Açık sorunlar: Dinamik OG image FAZ 6 kapsamında henüz eklenmedi.
- Sonraki adım: `SHARE_CARD`

### Session 6 — Share Card

- Tamamlanan: `next/og` tabanlı `/api/og/[slug]`, 1200×630 poster, repo/dönem/headline, üç highlight, metrics, status ve public URL.
- Metadata: Dynamic `og:image` ve `summary_large_image` Twitter card trace sayfasına bağlandı.
- Doğrulama: Gerçek trace 200 `image/png` olarak 64 KB render edildi; görsel orijinal boyutta incelendi ve sağ kolon taşması düzeltildi.
- Tasarım: Paper/canvas/ink/signal tokenları ve bol negatif alanla bağımsız poster kompozisyonu.
- Açık sorunlar: Üç repo uçtan uca stress testi FAZ 7 kapsamı.
- Sonraki adım: `POLISH`

### Session 7 — Polish

- Tamamlanan: Staged loading, copy feedback, global error boundary, uzun text wrap/truncation, reduced motion, keyboard-native details, responsive metric/receipt/share layout ve basit rate limit.
- Edge testleri: 0 commit pipeline sınırı, 1 commit tam çıktı, 100 commit bounded highlight/group/social output ve uzun slug kontrolü başarılı.
- Gerçek repo QA: `openai/openai-node`, `facebook/react`, `vercel/next.js` için 30 günlük analyze → save → public trace → OG image akışı 200 döndü.
- Hata QA: Invalid URL 400, missing repo 404, no commits 404, rate limit 429.
- Doğrulama: 18 otomatik test, ESLint, strict TypeScript ve production build başarılı; console/TODO/explicit `any` taraması temiz.
- Bilinen güvenlik uyarısı: `next@16.2.10` içindeki transitive PostCSS için 2 moderate audit bulgusu; güvenli non-breaking fix henüz yok.
- Sonraki adım: `DEPLOY_READY`

### Session 8 — Deploy Ready

- Tamamlanan: `.env.example`, Node engine, Vercel function duration sınırları, production favicon, güvenli Next config, README kurulum/migration/deploy/post-deploy rehberi.
- Cleanup: Varsayılan Next public assetleri kaldırıldı; bağımlılık ve console/TODO/explicit `any` taraması yapıldı.
- Final doğrulama: 18 test, ESLint, strict TypeScript, production build ve `npm start` landing/icon smoke testi başarılı.
- Production routes: `/`, `/api/analyze`, `/api/og/[slug]`, `/t/[slug]`, `/icon` build çıktısında doğrulandı.
- Deploy durumu: Vercel veya Supabase hesabına dış erişim kullanılmadı; deploy yapılmadı, proje deploy-ready.
- Sonraki adım: Kullanıcı migration, Vercel env ve production deploy adımlarını uygular.

### Session 9 — Groq Provider

- Değişiklik: Varsayılan AI sağlayıcısı OpenAI'dan Groq'ya, model `openai/gpt-oss-120b` olacak şekilde geçirildi.
- Entegrasyon: Groq'nun OpenAI-compatible Responses endpoint'i, Zod structured output, tek retry ve deterministik fallback sınırı korundu.
- Environment: `OPENAI_API_KEY`/`OPENAI_MODEL` yerine `GROQ_API_KEY`/`GROQ_MODEL` kullanılıyor; Supabase yerel bağlantısı korunuyor.
- Etkilenen dosyalar: `lib/ai/analyze.ts`, `lib/ai/providers/groq.ts`, `.env.example`, `.env.local`, `README.md`, `docs/05_TECH_ARCHITECTURE.md`.
- Kapsam değerlendirmesi: Yeni ürün özelliği eklenmedi; yalnız kullanıcı tarafından istenen provider değişimi yapıldığı için gece MVP hedefi tehlikeye girmiyor.
- Doğrulama: 18 test, ESLint, strict TypeScript ve production build başarılı.
- Gerçek provider: Groq GPT-OSS 120B structured-output smoke testi başarılı.
- Hata düzeltmesi: Supabase'in `+00:00` offset'li timestamp değerleri Zod doğrulamasında kabul ediliyor; insert sonrası oluşan yanlış `UNKNOWN_ERROR` giderildi.
- Yerel QA: Rate limit yalnız production'a taşındı. `/api/analyze` mevcut `vercel/next.js` trace'i için başarıyla slug döndürdü ve public trace sayfası HTTP 200 açıldı.
- Son doğrulama: 19 test, ESLint, strict TypeScript ve production build başarılı.

### Session 10 — Open-source Direction

- Ürün yönü: Resmi Vercel/production yayını iptal edildi; Shiptrace yerel çalışan açık kaynak kod projesi olarak paylaşılacak.
- Sıralama: Önce motion polish, sonra secret rotation ve açık kaynak repository hazırlığı yapılacak.
- Kapsam: Yeni ürün özelliği eklenmeyecek. Motion yalnız mevcut landing, progress ve trace deneyimini güçlendirecek.
- Etkilenen dosyalar: `README.md`, `PROJECT_STATE.md`.
- Gece hedefi etkisi: Ana akış zaten çalıştığı için risk oluşturmuyor; hosting operasyonu kapsamdan çıkarılarak kalan iş azaltılıyor.

### Session 11 — Motion Polish (post-MVP)

- Kapsam: Mevcut akış, veri davranışı ve Signal Lime tasarım sistemi korunarak landing, analysis progress ve trace sayfalarına sakin, premium ve tutarlı bir motion sistemi eklendi. Yeni ürün özelliği, yeni sayfa veya API/GitHub/Groq/Supabase/persistence değişikliği yapılmadı. Current phase `DEPLOY_READY` olarak korundu.
- Motion altyapısı: `app/globals.css` içine paylaşılan easing/süre token'ları (`--ease-out`, `--ease-settle`, `--ease-micro`, `--dur-*`), `st-rise`/`st-settle` giriş keyframe'leri ve reduced-motion + no-JS güvenli scroll-reveal sistemi eklendi. Tek küçük yardımcı bileşen: `components/motion/reveal-on-scroll.tsx` (IntersectionObserver, flash'sız in-view kontrolü).
- Landing: navbar→eyebrow→başlık→açıklama→form→receipt staggered giriş; navbar ve wordmark hover; repo input focus ve layout-shift'siz validation reveal (`:not(:empty)`, sallanma yok); receipt preview kontrollü hover (≤4px translate, ≤1.01 scale, `hover: hover`); how-it-works/example/final-CTA scroll reveal.
- Analysis progress: pending/active/completed geçişleri, ilerlemeyi anlatan connector rail fill (`--rail-fill`), düşük kontrastlı ve reduced-motion'da tamamen kapanan pulse, panel girişi, nötr aktif satır highlight'ı.
- Trace: landing'den daha kısa/doğrudan hero girişi; metric strip reveal + hover (count-up yok, kart yüksekliği sabit, mobil overflow yok); generated receipt clip-path reveal + sakin hover; highlights/change-log/source-commits scroll reveal; SSR ve SEO korundu (`/t/[slug]` hâlâ dinamik server-render).
- Copy/Share: copied/error state'leri, layout-shift'siz ikon morph (＋→✓/×), screen-reader `role="status"` live region; share buton hover/active/success.
- Erişilebilirlik: global focus-visible `a` ve `summary` için genişletildi (commit linkleri ve `details` özetleri dahil).
- Degradation: tüm motion `prefers-reduced-motion` ile kapanır; reveal'lar hem JS'siz hem reduced-motion'da içeriği tam görünür bırakır. Doğrulandı: animasyon/`js-reveal` kaldırıldığında hero ve reveal öğeleri opacity 1.
- Doğrulama: 19 test, ESLint, strict TypeScript ve production build başarılı; 375px landing'de yatay overflow yok. Not: In-app önizleme tarayıcısı CSS animasyon/geçiş karelerini ilerletmediği için hareket görsel olarak orada doğrulanamadı; kaskad mantığı, reduced-motion/no-JS degradation ve build ile doğrulandı.
- Etkilenen dosyalar: `app/globals.css`, `app/page.tsx`, `app/t/[slug]/page.tsx`, `components/motion/reveal-on-scroll.tsx`, `components/landing/*` (css + `analysis-progress.tsx`), `components/trace/*` (css + `metric-strip.tsx`, `receipt-card.tsx`, `highlights.tsx`, `change-groups.tsx`, `commit-list.tsx`, `share-panel.tsx`, `copy-button.tsx`).

### Session 12 — Open-source Release Preparation

- Lisans: Kullanıcı tercihiyle GNU Affero General Public License v3.0 only (`AGPL-3.0-only`) seçildi. `LICENSE` metni GNU'nun resmî kaynağıyla normalize edilmiş biçimde birebir doğrulandı.
- Repository paketi: Global İngilizce README, ürün önizleme görseli, contribution, security, support, Code of Conduct ve ayrı trademark policy eklendi. Package metadata, EditorConfig, Git attributes ve ignore kuralları açık kaynak yayın için düzenlendi.
- GitHub otomasyonu: Pull request/issue şablonları, Node 20 üzerinde lint/typecheck/test/build çalıştıran CI ve aylık npm/GitHub Actions Dependabot yapılandırması eklendi.
- Güvenlik: Repoya girecek dosyalarda Groq, Supabase, GitHub token/JWT kalıbı taraması temiz. `.env*` ignore edilirken yalnız `.env.example` izlenebilir durumda; `.claude/` ve `.agents/` yerel ajan ayarları da ignore edildi. Supabase yapılandırması yeni publishable/secret API key adlarına geçirildi; legacy adlar yalnız geriye dönük uyumluluk için tutuldu.
- Bağımlılıklar: Doğrudan lisanslar MIT veya Apache-2.0. Next.js altındaki eski PostCSS, global `^8.5.20` override ile güvenlik düzeltmeli sürüme taşındı; `npm audit` sonucu `0 vulnerabilities`.
- Doğrulama: `npm ci --dry-run`, 19/19 test, ESLint, strict TypeScript ve production build başarılı. Secret ve console/TODO/FIXME/explicit `any` taramaları temiz.
- Değişen karar: Proje resmî olarak host edilmeyecek; bu çalışma yalnız public kaynak repository kalitesini güçlendiriyor. Yeni ürün özelliği eklenmedi, ana MVP akışı ve gece hedefi tehlikeye girmiyor.
- Etkilenen dosyalar: `LICENSE`, `README.md`, `package.json`, `package-lock.json`, `.env.example`, `.gitignore`, `.editorconfig`, `.gitattributes`, `CONTRIBUTING.md`, `SECURITY.md`, `SUPPORT.md`, `CODE_OF_CONDUCT.md`, `TRADEMARKS.md`, `.github/**`, `docs/assets/shiptrace-preview.svg`, `docs/05_TECH_ARCHITECTURE.md`, `lib/persistence/store.ts`, `PROJECT_STATE.md`.
- Yayın engelleri: Sohbette görünmüş Groq ve Supabase service-role anahtarları yenilenmeden Git başlatılmayacak. GitHub CLI kurulduktan ve hesap bağlantısı tamamlandıktan sonra temiz ilk commit ile public repository oluşturulacak.

### Session 13 — Public GitHub Release

- Repository: `https://github.com/tuneay/Shiptrace` public olarak oluşturuldu; varsayılan branch `main`, açıklama kullanıcı tarafından onaylanan “Shiptrace turns GitHub activity into clear, verifiable progress trails for projects.” metnidir.
- İlk sürüm: 97 dosya staged secret taramasından geçirildi; `.env.local`, `.claude/` ve `.agents/` ignore edildi. `8bd377b` (`Initial open-source release`) commit'i `origin/main` branch'ine gönderildi.
- Repository yüzeyi: Issues açık, Wiki kapalı; Next.js, TypeScript, GitHub API, Supabase, Groq, GPT-OSS, developer tools, build-in-public, open source, proof of progress ve OG image topic'leri eklendi.
- Güvenlik: GitHub secret scanning, push protection, Dependabot alerts/security updates ve private vulnerability reporting aktif. Yalnız squash merge açık; merge sonrası branch temizliği ve branch update desteği etkin.
- CI: İlk GitHub Actions `Verify` işi başarıyla tamamlandı. Dependabot'un önerdiği ve CI'dan geçen `actions/checkout@v7` ile `actions/setup-node@v7` ana workflow'a alındı.
- Dependabot politikası: Gürültülü/kırıcı otomatik major sürüm PR'larını engellemek için npm major version updates ignore edildi; aylık non-major npm ve GitHub Actions güncellemeleri kendi gruplarında birleştirildi. Security updates ayrıca aktif kalır.
- Faz/kapsam etkisi: Ürün veya hosting kapsamı değişmedi; phase `DEPLOY_READY` olarak korundu. Bu çalışma yalnız kaynak dağıtımı, topluluk yüzeyi ve supply-chain güvenliğini tamamladı.
