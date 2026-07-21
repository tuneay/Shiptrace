# 02 — MVP Scope

## MVP hipotezi

Geliştiriciler, GitHub aktivitelerinden otomatik oluşturulan şık ve anlaşılır ilerleme kartlarını paylaşmak ister.

Bu hipotezi test etmek için üyelik, ödeme veya otomatik haftalık sistem gerekmez. Tek gereken şey, repo bağlantısından güçlü bir çıktı üretmektir.

## Temel kullanıcı hikâyesi

> Bir solo founder olarak public GitHub repo bağlantımı girip son 7 gündeki çalışmalarımı teknik olmayan insanların anlayabileceği bir ilerleme özetine çevirmek istiyorum; böylece bunu sosyal medyada ve yatırımcı güncellemelerinde paylaşabilirim.

## Zorunlu özellikler

### Landing page

- Net ürün tanımı
- Repo URL giriş alanı
- 7/30 gün seçimi
- Örnek sonuç ön izlemesi
- Tek ana CTA: `Generate your trace`

### Repo doğrulama

Kabul edilen formatlar:

```text
https://github.com/owner/repository
github.com/owner/repository
owner/repository
```

Çıktı:

```json
{
  "owner": "owner",
  "repo": "repository"
}
```

### GitHub veri katmanı

Çekilecek veriler:

- Repo adı
- Repo açıklaması
- Repo URL
- Varsayılan branch
- Commit SHA
- Commit mesajı
- Commit tarihi
- Commit yazarı display name
- Commit URL
- Repo stars ve forks bilgisi
- Dönem içindeki toplam commit sayısı
- Aktif gün sayısı
- Benzersiz contributor sayısı

MVP'de dosya içerikleri ve diff detayları çekilmez.

### AI analiz katmanı

Üretilecek alanlar:

- Ana başlık
- Tek paragraflık ilerleme özeti
- En önemli 3–5 gelişme
- Kategoriler
- Gürültü olarak işaretlenen commitler
- Sosyal medya metni
- Ürün durumu etiketi
- Güven skoru

Kategoriler:

- Feature
- Fix
- Improvement
- Infrastructure
- Documentation
- Maintenance

### Public trace page

URL:

```text
/t/[slug]
```

Bölümler:

1. Repo ve dönem başlığı
2. Ana ürün özeti
3. Metrik şeridi
4. Receipt görünümü
5. Önemli gelişmeler
6. Kategori bazlı değişiklikler
7. Commit listesi
8. Share card
9. Sosyal metin
10. Shiptrace CTA

### Share card

Boyut:

```text
1200 × 630
```

İçerik:

- Shiptrace işareti
- Repo adı
- Dönem
- Ana başlık
- Commit sayısı
- Aktif gün
- Öne çıkan 3 madde
- Public trace URL

### Persistence

Her analiz Supabase'e kaydedilir ve kalıcı slug alır.

Slug örneği:

```text
upvera-jul-14-21-a8f3
```

## Kalite gereksinimleri

- İlk anlamlı sonuç, butona basıldıktan sonra mümkün olduğunca erken görünmeli.
- Kullanıcı beklerken işlem aşamaları gösterilmeli.
- Mobilde tüm temel işlevler çalışmalı.
- Sonuç sayfası paylaşılmaya değer görünmeli.
- AI sonucu düzenli JSON olarak doğrulanmalı.
- AI başarısızsa ürün tamamen çökmeden fallback çalışmalı.
- Public trace sayfası doğru OG metadata taşımalı.

## Bu gece kapsam dışı

- Authentication
- Private repo
- Kullanıcı dashboard'u
- Trace düzenleme
- Silme paneli
- Scheduled automation
- E-posta
- Ödeme
- GitHub webhook
- Çoklu dil
- Takım alanı
- Commit diff analizi
- Pull request analizi
- Issue analizi
- Gelişmiş contribution graph
- PDF export

## Kapsam kesme sırası

Gece zaman daralırsa şu sırayla özellik çıkar:

1. Stars/forks gösterimi
2. Contributor sayısı
3. Ayrıntılı commit listesi
4. Sosyal medya için birden fazla metin seçeneği
5. Supabase yerine geçici local result

Asla çıkarılmaması gerekenler:

1. Repo analizi
2. Güçlü sonuç sayfası
3. Share card
4. Kopyalanabilir metin
