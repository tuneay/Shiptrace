# 10 — Future Upvera Integration

## Stratejik rol

Shiptrace, Upvera'dan bağımsız şekilde değer üretebilen fakat zamanla Upvera'nın kullanıcı edinme ve doğrulanmış ilerleme veri katmanına dönüşebilen bir wedge ürünüdür.

Wedge mantığı:

```text
GitHub repo
  ↓
Shiptrace
  ↓
Progress proof
  ↓
Public sharing
  ↓
Project discovery
  ↓
Upvera project profile
```

## İlk entegrasyon

Trace sayfasının altında:

```text
Track the full project journey on Upvera
```

Kullanıcı:

- Shiptrace verisiyle yeni Upvera projesi açar.
- Repo adı, açıklama ve son trace otomatik taşınır.
- İlk proje güncellemesi otomatik oluşur.

## Upvera veri modeli karşılığı

Shiptrace alanları:

| Shiptrace | Upvera |
|---|---|
| Repo | Project integration |
| Trace | Project update |
| Highlight | Milestone candidate |
| Active days | Consistency signal |
| Commit count | Development activity |
| Contributor count | Team signal |
| Status | Momentum context |
| Public trace | External proof link |

## PRISM sinyalleri

Shiptrace doğrudan skor vermemelidir. Upvera PRISM için aşağıdaki doğrulanabilir girdileri sağlar:

- Güncellik
- Aktif geliştirme günleri
- Commit sürekliliği
- Release işaretleri
- Katkıcı çeşitliliği
- Teknik aktivitenin proje güncellemeleriyle tutarlılığı

Commit sayısını tek başına başarı göstergesi olarak kullanmak hatalıdır. Çok commit, çok değer anlamına gelmez.

## Ranks bağlantısı

Shiptrace:

- “Verified development activity” rozeti sağlayabilir.
- Ranks içinde ek kanıt katmanı olabilir.
- Projenin haftalık hareketini doğrulayabilir.
- Sahte veya tamamen metin tabanlı güncellemelerin ağırlığını azaltabilir.

## Dağıtım avantajı

Her Shiptrace kartında küçük bir ibare:

```text
PROGRESS INFRASTRUCTURE BY UPVERA
```

Bu ibare ilk MVP'de kullanılmamalıdır. Shiptrace önce kendi değerini kanıtlamalıdır.

Daha sonra:

```text
Shiptrace by Upvera
```

modeline geçilebilir.

## Ürün genişleme sırası

1. Public repo trace
2. GitHub sign-in
3. Private repo
4. Scheduled weekly trace
5. Upvera import
6. Automatic Upvera updates
7. Multi-repo project
8. Verified momentum API
9. Investor-facing project history
10. PRISM integration

## Kaçınılması gereken stratejik hata

Shiptrace'i ilk günden Upvera'nın küçük bir özelliği gibi sunmak, ürünün paylaşılabilir bağımsız kimliğini zayıflatabilir.

Doğru yaklaşım:

- İlk aşamada bağımsız, tek amaçlı ve hızlı ürün.
- Kullanıcı davranışı doğrulandıktan sonra Upvera bağlantısı.
- Entegrasyon “hesap açtırma zorunluluğu” değil, doğal bir sonraki adım olmalı.
