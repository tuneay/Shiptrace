# 04 — User Flows

## Ana akış

```text
Landing
  ↓
Repo URL gir
  ↓
7 veya 30 gün seç
  ↓
Generate your trace
  ↓
Repo doğrulama
  ↓
GitHub verisi çekme
  ↓
AI analiz
  ↓
Supabase kayıt
  ↓
Public trace sayfası
  ↓
Kartı paylaş / metni kopyala
```

## Flow 1 — Başarılı analiz

### Adım 1: Landing

Kullanıcı ürünün değerini 5 saniye içinde anlamalıdır.

Başlık:

> Your commits deserve a better story.

Alt metin:

> Paste a public GitHub repository. Shiptrace turns recent development activity into a clear progress report and a shareable proof card.

### Adım 2: Repo girişi

Input:

```text
github.com/owner/repository
```

Period:

```text
7 DAYS
30 DAYS
```

CTA:

```text
Generate your trace
```

### Adım 3: İşlem ekranı

Kullanıcı boş bir spinner görmez. Aşağıdaki aşamalar görünür:

- Repository found
- Commit history collected
- Maintenance noise filtered
- Product changes grouped
- Trace generated

Repo adı ve bulunan commit sayısı mümkün olduğunca erken gösterilir.

### Adım 4: Sonuç

İlk viewport:

- Repo adı
- Dönem
- Ana ilerleme başlığı
- Tek paragraf özet
- Metrikler
- `Share trace` butonu

Kullanıcı aşağı indikçe detay görür.

### Adım 5: Paylaşım

Seçenekler:

- Copy trace URL
- Download/share card
- Copy LinkedIn text
- Copy X text

MVP'de native platform paylaşım entegrasyonu zorunlu değildir.

## Flow 2 — Commit bulunamadı

Mesaj:

> No visible progress in this period.

Alt metin:

> We found the repository, but there were no commits in the selected time range. Try the last 30 days.

CTA:

```text
Analyze 30 days
```

## Flow 3 — Private repo

Mesaj:

> This repository is not publicly accessible.

Alt metin:

> Shiptrace supports public repositories in this version. Private repository support will require GitHub authorization.

CTA:

```text
Try another repository
```

## Flow 4 — Geçersiz URL

Input altında:

> Enter a valid GitHub repository URL, such as github.com/owner/repository.

Form verisi silinmez.

## Flow 5 — GitHub rate limit

Mesaj:

> GitHub is temporarily limiting requests.

Alt metin:

> The repository is valid, but we could not read its activity right now.

CTA:

```text
Try again
```

Teknik hata kodu kullanıcıya gösterilmez.

## Flow 6 — AI hatası

AI servisi çalışmazsa:

- Commitler deterministic kurallarla gruplanır.
- Başlık repo adı ve commit sayısından üretilir.
- Sonuç sayfası yine açılır.
- Küçük bir not gösterilebilir:

> Generated with a simplified summary.

Kullanıcı tamamen engellenmez.

## Flow 7 — Public trace ziyaretçisi

Trace sayfasını paylaşım linkinden açan ziyaretçi:

1. Projenin ne yaptığını anlar.
2. Son dönemde ne değiştiğini görür.
3. GitHub reposuna gidebilir.
4. Kendi reposu için trace oluşturabilir.

Sayfanın sonunda CTA:

> Building something too? Generate your own trace.

## Information architecture

```text
/
├─ Hero
├─ Input
├─ How it works
├─ Example trace
└─ Final CTA

/create
├─ Input state
├─ Validation
└─ Analysis progress

/t/[slug]
├─ Trace header
├─ Summary
├─ Metrics
├─ Receipt
├─ Highlights
├─ Change groups
├─ Commits
├─ Share tools
└─ Product CTA
```

`/create` ayrı sayfa olmak zorunda değildir. Landing form submit sonrası aynı sayfada progress state açılabilir. Daha hızlı geliştirme için bu tercih edilir.
