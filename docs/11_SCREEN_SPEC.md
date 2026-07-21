# 11 — Screen Specification

## Screen 1 — Landing

### Desktop

```text
┌──────────────────────────────────────────────────────────────┐
│ SHIPTRACE                                  EXAMPLE   GENERATE │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│ PROOF OF PROGRESS                                            │
│                                                              │
│ Your commits deserve         ┌─────────────────────────────┐ │
│ a better story.              │ SHIPTRACE / PROOF           │ │
│                              │ ───────────────────────────  │ │
│ Paste a public GitHub repo.  │ PROJECT          UPVERA     │ │
│ Get a progress report and    │ COMMITS          24         │ │
│ shareable proof card.        │ ACTIVE DAYS      06         │ │
│                              │ STATUS           SHIPPING   │ │
│ [ github.com/...          ]  │ ───────────────────────────  │ │
│ [7 DAYS] [30 DAYS] [GENERATE]│ 01 ONBOARDING COMPLETED     │ │
│                              │ 02 RANKING API INTRODUCED    │ │
│ Public repos only.           └─────────────────────────────┘ │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

### Davranış

- Input focus alınca border `ink`.
- Period seçimi signal lime.
- Generate sırasında button disable.
- Receipt preview çok hafif şekilde canlı veri değiştiriyormuş hissi verebilir; autoplay animasyon zorunlu değil.

## Screen 2 — Analysis state

```text
┌──────────────────────────────────────────────────────────────┐
│ UPVERA / LAST 7 DAYS                                         │
│                                                              │
│ ● Repository found                                           │
│ ● Commit history collected                                   │
│ ◌ Filtering maintenance noise                                │
│ ○ Finding meaningful progress                                │
│ ○ Writing your trace                                         │
│                                                              │
│ 24 commits across 6 active days                              │
└──────────────────────────────────────────────────────────────┘
```

- Spinner yerine aşamalı durum.
- Tamamlanan adım dolu nokta.
- Aktif adım yavaş pulse.
- Gelecek adım boş nokta.

## Screen 3 — Trace page hero

```text
PROOF OF PROGRESS                  JUL 14—21 / 7 DAYS

Upvera

The ranking foundation and project onboarding
flow moved into place.

Development focused on completing the first project onboarding
path, introducing the ranking API foundation, and refining the
underlying data model.

[24 COMMITS] [6 ACTIVE DAYS] [2 CONTRIBUTORS] [BUILDING]

[SHARE TRACE] [VIEW REPOSITORY]
```

## Screen 4 — Receipt and highlights

İki kolon:

- Sol: Receipt
- Sağ: 3–5 highlight

Mobilde receipt üstte.

## Screen 5 — Change log

Her grup:

```text
FEATURE / 03 COMMITS

Project onboarding moved into place

The first complete flow for creating and configuring a project
was introduced and refined.

View source commits →
```

Commit listesi accordion olabilir.

## Screen 6 — Share section

Sol:

- Share card preview

Sağ:

- Copy trace link
- Copy LinkedIn post
- Copy X post
- Open card

Altında editable textarea MVP'de yoktur; yalnızca copy.

## Screen 7 — Footer CTA

```text
BUILDING SOMETHING TOO?

Turn your recent commits into proof of progress.

[GENERATE YOUR TRACE]
```

## Component states

### Button

- Default
- Hover
- Focus
- Loading
- Disabled
- Success

### Input

- Empty
- Focused
- Valid
- Invalid
- Submitted

### Receipt

- Preview
- Loading skeleton
- Generated
- Fallback generated

### Share card

- Loading
- Ready
- Error

## Skeleton

Skeleton'lar gri bloklardan oluşur fakat gerçek layout'u taklit eder. Shimmer minimum ve yavaş olmalıdır.
