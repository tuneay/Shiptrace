# 03 — Design System

## Tasarım fikri

Shiptrace'in görsel dili “digital proof slip” kavramına dayanır.

Ürün bir market fişini birebir taklit etmez. Termal kâğıdın dürüstlüğünü, geliştirici araçlarının kesinliğini ve premium editoryal tasarımın sakinliğini birleştirir.

Temel hisler:

- Doğrulanabilir
- Teknik
- Sessiz
- Premium
- Keskin
- Paylaşılabilir
- İnsan yapımı

## Kaçınılacak görünüm

- Mor-mavi AI gradientleri
- Büyük parlak 3D küreler
- Aşırı glassmorphism
- Sürekli parlayan animasyonlar
- Generic SaaS dashboard kartları
- Çok renkli kategori sistemi
- Robot, yıldız veya sihir değneği ikonları
- “AI slop” illüstrasyonlar
- Her alana gölge verme
- Fazla yuvarlatılmış çocukça arayüz

## Marka sistemi

### Ana renkler

| Token | Hex | Kullanım |
|---|---:|---|
| `canvas` | `#F4F0E7` | Ana arka plan |
| `paper` | `#FFFCF6` | Kartlar ve receipt |
| `ink` | `#11110F` | Ana metin |
| `muted` | `#716D65` | İkincil metin |
| `line` | `#D8D1C4` | Kenarlık ve ayraç |
| `soft-line` | `#E8E2D8` | İç ayraçlar |
| `signal` | `#D7FF45` | Tek vurgu rengi |
| `signal-dark` | `#9ABF00` | Hover/kontrast |
| `danger` | `#B9382F` | Hata |
| `success` | `#247A4A` | Başarılı durum |

Signal Lime yalnızca şu yerlerde kullanılmalı:

- Ana CTA
- Status chip
- Seçili period
- Küçük vurgu çizgileri
- Kopyalama başarılı durumu

Sayfanın %10'undan fazlasını kaplamamalıdır.

### Tipografi

**Sans:** Geist Sans  
**Mono:** Geist Mono

Önerilen ölçek:

| Stil | Boyut | Satır | Ağırlık |
|---|---:|---:|---:|
| Display | 72px | 0.96 | 620 |
| H1 | 52px | 1.00 | 600 |
| H2 | 34px | 1.08 | 600 |
| H3 | 22px | 1.20 | 600 |
| Body Large | 19px | 1.55 | 450 |
| Body | 16px | 1.55 | 420 |
| Small | 13px | 1.45 | 450 |
| Data | 13px | 1.35 | 500 mono |
| Label | 11px | 1.20 | 600 mono uppercase |

Mobilde display 44px, H1 36px seviyesine düşürülür.

### Grid

- Maksimum sayfa genişliği: 1180px
- Desktop: 12 kolon
- Tablet: 8 kolon
- Mobil: 4 kolon
- Dış boşluk desktop: 32px
- Dış boşluk mobil: 18px
- Section spacing: 112px desktop, 72px mobil

### Radius

- Büyük panel: 24px
- Ana kart: 18px
- Küçük kart: 12px
- Button: 12px
- Chip: 999px

Receipt kartının radius değeri diğer kartlardan daha küçük olabilir: 8px.

### Shadow

Ana gölge:

```css
box-shadow:
  0 1px 1px rgba(17, 17, 15, 0.04),
  0 12px 40px rgba(17, 17, 15, 0.06);
```

Gölge yerine sınırlar ve boşluklar tercih edilir.

## Logo fikri

Kelime işareti:

```text
SHIPTRACE
```

- Büyük harf veya küçük harf kullanılabilir.
- Mono karakterlerle teknik alt katman desteklenir.
- İkon, iki kısa paralel çizginin tek bir ilerleme izine birleşmesi şeklinde olabilir.
- Bir checkmark gibi görünmemeli.
- Bir Git branch ikonunun kopyası olmamalı.

MVP'de özel çizilmiş logo yerine güçlü bir wordmark yeterlidir.

## Ana bileşenler

### Button

Primary:

- Ink zemin
- Paper metin
- Hover'da Signal Lime metin veya ince vurgu
- 48–52px yükseklik
- 12px radius

Signal button yalnızca kritik bir yerde kullanılabilir; tüm butonları lime yapma.

### Repo input

- Büyük, tek satır
- Sol tarafta GitHub ikonu
- Placeholder: `github.com/owner/repository`
- Sağ tarafta period selector veya CTA
- Focus sırasında kalın siyah sınır
- Hatalı durumda kırmızı metin, sallanma animasyonu yok

### Period selector

İki seçenek:

```text
7 DAYS  |  30 DAYS
```

Mono label. Seçili alan signal arka plan.

### Metric strip

Tek bir büyük panel içinde 3 veya 4 metrik:

- Commits
- Active days
- Contributors
- Momentum

Her metrikte büyük değer ve mono label.

### Receipt card

Dikey kart. Paper zemin. İnce perforation hissi veren üst/alt edge kullanılabilir fakat aşırı gerçekçi fiş görünümü yapılmaz.

Örnek:

```text
SHIPTRACE / PROOF OF PROGRESS
────────────────────────────
PROJECT          UPVERA
PERIOD           JUL 14—21
COMMITS          24
ACTIVE DAYS      06
CONTRIBUTORS     02
────────────────────────────
STATUS           SHIPPING
────────────────────────────
01  AUTH FLOW COMPLETED
02  RANKING API INTRODUCED
03  DATABASE MODEL REFINED
────────────────────────────
TRACE            8F3A21
```

### Change group

- Kategori başlığı mono label
- Büyük, açıklayıcı ürün cümlesi
- Altında ilgili commitler collapsed list
- Kategorilere farklı renk verilmez
- Kategori ayrımı ikon ve tipografiyle yapılır

### Share card

Sosyal medya kartı sonuç sayfasının minyatürü olmamalı. Daha poster gibi davranmalıdır:

- Sol üst: wordmark
- Büyük ana başlık
- Altında üç önemli gelişme
- Sağ alt veya alt şerit: metrikler
- Signal Lime küçük bir blok/etiket
- Bol negatif alan

## Landing page yapısı

### Navbar

Sol: Shiptrace  
Sağ: `Example trace` ve `Generate`

Navbar sabit olmak zorunda değil. Landing sade kalmalı.

### Hero

Sol tarafta:

- Eyebrow: `PROOF OF PROGRESS`
- Başlık: `Your commits deserve a better story.`
- Alt metin
- Repo input
- Küçük güven cümlesi: `Public repos only. No code is downloaded.`

Sağ tarafta:

- Eğik olmayan, net bir receipt preview
- Hafif mouse hareketi olabilir; maksimum 4–6px
- Parallax ana özellik olmamalı

### Proof strip

```text
REPO URL → VERIFIED ACTIVITY → HUMAN-READABLE TRACE → SHARE
```

### Example section

Gerçekçi bir örnek repo üzerinden sonuç sayfası kesiti.

### Final CTA

```text
Your work already happened.
Now make it visible.
```

## Motion

- Hover: 160ms
- Panel reveal: 260ms
- Page transition: 220–300ms
- Loading progress adımları: yaklaşık 700–1000ms görsel geçişlerle ilerleyebilir; gerçek işlem sonucuna bağlı olmalı
- Spring efektleri minimum
- Scale hover maksimum `1.01`
- Cursor takip eden agresif efekt yok
- Reduce motion desteklenmeli

## Loading deneyimi

Analiz sırasında aşamalar:

1. `Reading repository history`
2. `Filtering maintenance noise`
3. `Finding meaningful progress`
4. `Writing your trace`
5. `Preparing the share card`

Her aşama mono yazıyla görünür. Sahte yüzde kullanma; aşama bazlı durum göster.

## Responsive davranış

Mobilde:

- Hero tek kolona iner.
- Input ve buton alt alta gelir.
- Receipt tam genişlik olur.
- Metrikler 2×2 grid olur.
- Share card yatay preview içinde küçülmek yerine uygun mobil kapsayıcıya oturur.
- Commit listeleri varsayılan kapalı olabilir.
