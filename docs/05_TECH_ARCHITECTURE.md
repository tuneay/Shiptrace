# 05 — Technical Architecture

## Mimari hedef

Bir gecelik MVP için sistem:

- Basit
- Server-side güvenli
- Kolay deploy edilir
- Provider değişimine açık
- Hata durumlarında tamamen çökmeyen
- Daha sonra Upvera'ya taşınabilir

olmalıdır.

## Stack

### Frontend

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- Lucide icons
- React Hook Form veya yalın controlled form
- Zod

### Backend

- Next.js Route Handlers
- Supabase Postgres
- GitHub REST API
- Groq API ve GPT-OSS modeli
- Vercel deployment

### Share image

Tercih sırası:

1. `next/og`
2. Satori
3. `html-to-image` yalnızca client export gerektiğinde

Server-side OG image daha güvenilir ve paylaşım linkleri için daha değerlidir.

## Veri akışı

```text
Browser
  ↓ POST /api/analyze
Validate input
  ↓
Parse owner/repo
  ↓
GitHub API
  ↓
Normalize commits
  ↓
Noise filter
  ↓
AI structured analysis
  ↓
Zod validation
  ↓
Fallback if needed
  ↓
Supabase insert
  ↓
Return slug
  ↓
Redirect /t/[slug]
```

## API endpoint

### `POST /api/analyze`

Input:

```json
{
  "repository": "https://github.com/owner/repository",
  "periodDays": 7
}
```

Success:

```json
{
  "ok": true,
  "slug": "repository-jul-14-21-a8f3",
  "url": "/t/repository-jul-14-21-a8f3"
}
```

Error:

```json
{
  "ok": false,
  "code": "NO_COMMITS",
  "message": "No commits were found in this period."
}
```

## GitHub entegrasyonu

### Repo bilgisi

```http
GET /repos/{owner}/{repo}
```

### Commitler

```http
GET /repos/{owner}/{repo}/commits?since={ISO_DATE}&until={ISO_DATE}&per_page=100
```

MVP'de maksimum 100 commit yeterlidir. Daha fazlası varsa:

- En yeni 100 commit kullanılır.
- Sonuçta `100+ commits` gösterilir.
- AI token limitini korumak için önce local filtering uygulanır.

### Header

Server tarafında:

```text
Authorization: Bearer GITHUB_TOKEN
Accept: application/vnd.github+json
```

Token asla client bundle'a gitmemelidir.

## Commit normalization

Normalize edilmiş commit:

```ts
type NormalizedCommit = {
  sha: string;
  shortSha: string;
  message: string;
  date: string;
  authorName: string | null;
  url: string;
};
```

Commit mesajında yalnızca ilk satır ana başlık olarak kullanılabilir. Body maksimum belirli karaktere kırpılır.

## Local noise filter

AI çağrısından önce aşağıdaki commitler düşük öncelikli işaretlenebilir:

- `merge`
- `bump`
- `chore`
- `format`
- `lint`
- `typo`
- `deps`
- `dependency`
- `lockfile`
- `readme`
- `wip`

Tamamen silmek yerine `isLikelyNoise` alanı verilir. Bazı `chore` commitleri önemli olabilir.

## AI sağlayıcı adaptörü

```ts
interface AnalysisProvider {
  analyze(input: AnalysisInput): Promise<TraceAnalysis>;
}
```

Provider'a özel kod `lib/providers/` altında tutulmalıdır.

```text
lib/providers/groq.ts
lib/providers/fallback.ts
```

## Caching

Aynı repo ve aynı dönem kısa süre içinde tekrar analiz edilirse mevcut trace döndürülebilir.

Basit cache key:

```text
owner/repo:periodDays:lastCommitSha
```

MVP'de zorunlu değil; GitHub ve AI maliyetini azaltır.

## Rate limiting

Bir gecelik sürüm için basit yaklaşım:

- IP başına saatte 5 analiz
- Aynı repo için 10 dakika içinde maksimum 2 yeni analiz
- Vercel KV yoksa Supabase tablosu veya memory tabanlı geçici limit

Memory tabanlı limit serverless ortamda kusursuz değildir; yine de temel koruma sağlar.

## SEO ve metadata

Trace sayfasında:

- Dinamik title
- Dinamik description
- Dinamik OG image
- Canonical URL
- Repo adı ve dönem

Örnek title:

```text
Upvera shipped 24 commits this week — Shiptrace
```

## Environment variables

```env
GITHUB_TOKEN=
GROQ_API_KEY=
GROQ_MODEL=openai/gpt-oss-120b
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=
SUPABASE_SECRET_KEY=
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

Secret key yalnızca server tarafında kullanılmalıdır. Mevcut yerel kurulumlar için legacy `NEXT_PUBLIC_SUPABASE_ANON_KEY` ve `SUPABASE_SERVICE_ROLE_KEY` adları geriye dönük olarak desteklenir.

## Observability

MVP için:

- Server error log
- GitHub status code
- AI provider duration
- Analiz başarı/başarısızlık sayısı
- Supabase insert error

Commit mesajlarını gereksiz yere loglama.

## Performans hedefi

- Landing LCP: hızlı ve hafif
- Client JS minimum
- Trace sayfası mümkün olduğunca server-rendered
- Görseller optimize
- Animasyonlar CSS tabanlı
- AI çağrısı dışındaki UI state anında tepki vermeli
