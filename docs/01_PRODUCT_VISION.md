# 01 — Product Vision

## Ürün adı

# Shiptrace

“Ship” üretmeyi ve yayınlamayı, “trace” ise geride kalan doğrulanabilir izi temsil eder.

İsim, ürünün yalnızca bir özet aracı değil; zaman içinde ürün geliştirme geçmişi oluşturan bir altyapıya dönüşebilmesini sağlar.

## Tek cümlelik tanım

Shiptrace, GitHub commit geçmişini insanların anlayabileceği, paylaşılabilir bir ürün ilerleme kaydına dönüştürür.

## İngilizce tanım

Shiptrace turns GitHub activity into a clear, shareable proof of progress.

## Tagline

**Turn commits into proof of progress.**

Alternatif mikro metin:

- Your work happened. Make it visible.
- A visible trail of what you shipped.
- Proof that the product is moving.

## Problem

Kod geliştiren insanlar gün boyunca önemli işler yapar fakat dışarıdan bakıldığında bu işler görünmezdir.

GitHub commit geçmişi:

- Fazla teknik görünür.
- Dağınıktır.
- Ürün sonucunu anlatmaz.
- Sosyal medyada paylaşılabilir değildir.
- Yatırımcı, müşteri veya topluluk için okunması zordur.
- Bir haftanın ne kadar verimli geçtiğini tek bakışta göstermez.

Bir geliştirici `fix auth callback`, `refactor schema` veya `add ranking endpoint` yazar. Bunlar teknik olarak anlamlıdır fakat ürün seviyesinde şu hikâyeye dönüşmelidir:

> Kullanıcı giriş akışı güvenilir hâle getirildi, veri altyapısı sadeleştirildi ve sıralama sisteminin ilk API katmanı tamamlandı.

Shiptrace bu dönüşümü otomatikleştirir.

## Çözüm

Shiptrace bir public GitHub reposunun belirli dönemdeki commit verisini çeker ve:

1. Değişiklikleri ürün kategorilerine ayırır.
2. Teknik gürültüyü filtreler.
3. İnsanların okuyabileceği bir özet üretir.
4. İlerleme metrikleri çıkarır.
5. Kalıcı bir public sayfa oluşturur.
6. Sosyal medyada paylaşılabilir bir kart üretir.
7. Kopyalanabilir build-in-public metni verir.

## Ürünün yapmadığı şey

Shiptrace:

- Jira değildir.
- GitHub alternatifi değildir.
- Kod kalitesi denetçisi değildir.
- Otomatik changelog aracının aynısı değildir.
- Takım performansını gözetleyen bir sistem değildir.

Shiptrace'in görevi teknik aktiviteyi **görünür ilerlemeye** çevirmektir.

## İlk hedef kullanıcılar

### 1. Solo founder

Ürünün gerçekten ilerlediğini göstermek, haftalık güncelleme paylaşmak ve güven oluşturmak ister.

### 2. Indie hacker

Build-in-public içeriği hazırlamak için her hafta vakit harcamak istemez.

### 3. Açık kaynak geliştiricisi

Projenin aktif ve gelişmeye devam ettiğini göstermek ister.

### 4. Küçük ürün ekibi

Stakeholder'lara teknik olmayan haftalık ilerleme özeti sunmak ister.

## Ana kullanım anı

Kullanıcı haftanın sonunda şu soruyu sorduğunda:

> “Bu hafta ne yaptığımı düzgün bir şekilde nasıl gösterebilirim?”

Shiptrace açılmalıdır.

## North Star

**Haftalık oluşturulan ve dışarıda paylaşılan trace sayısı.**

Sadece analiz oluşturmak yeterli değildir. Ürünün gerçek değeri, sonucun başkaları tarafından görülmesidir.

## MVP başarı sinyalleri

İlk 30 gerçek kullanıcı içinde:

- Kullanıcıların en az %40'ı oluşturduğu kartı indirir veya paylaşır.
- En az %25'i ikinci bir trace oluşturmak için geri döner.
- Trace sayfaları üretici dışındaki kişilerden görüntülenme alır.
- Kullanıcılar “commit özetleyici” değil, “progress proof” olarak tanımlar.

## Uzun vadeli vizyon

Shiptrace zaman içinde:

- GitHub App üzerinden otomatik haftalık trace oluşturabilir.
- Bir projenin doğrulanmış üretim geçmişini tutabilir.
- Farklı depoları tek ürün altında birleştirebilir.
- Yatırımcı ve erken kullanıcılar için momentum sinyali üretebilir.
- Upvera üzerinde proje güncellemelerini otomatik besleyebilir.
- PRISM ve Ranks için doğrulanabilir üretim verisi sağlayabilir.

Uzun vadeli ürün:

> Ürünlerin yalnızca ne söylediklerini değil, gerçekten ne kadar ilerlediklerini gösteren doğrulanabilir bir hareket katmanı.
