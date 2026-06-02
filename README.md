# LDS Chinese Directory

A map-based directory for Mandarin, Chinese-speaking, Cantonese, and related Asian YSA Latter-day Saint units around the world.

The project currently focuses on a lightweight public directory experience: an intro page, bilingual language selection, an interactive Leaflet map, unit popups, detail pages, and curated official church page links where they have been verified.

## Features

- Intro page with Traditional Chinese and English entry points
- Interactive Leaflet map with OpenStreetMap tiles
- Unit search by name, city, state, postal code, or address
- Filters for language, unit type, and status
- Marker popups with unit summary, detail link, and official church page link when verified
- Static detail pages for each listed unit
- Traditional Chinese display names for all current units
- Static TypeScript data source, suitable for Vercel deployment

## Tech Stack

[![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-61DAFB?style=flat&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Leaflet](https://img.shields.io/badge/Leaflet-199900?style=flat&logo=leaflet&logoColor=white)](https://leafletjs.com/)
[![OpenStreetMap](https://img.shields.io/badge/OpenStreetMap-7EBC6F?style=flat&logo=openstreetmap&logoColor=white)](https://www.openstreetmap.org/)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)](https://developer.mozilla.org/docs/Web/CSS)
[![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat&logo=vercel&logoColor=white)](https://vercel.com/)

This project uses the Next.js App Router, React Server Components, TypeScript,
Leaflet map rendering, OpenStreetMap tiles, and plain CSS in
`app/globals.css`.

## Getting Started

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open:

```txt
http://localhost:3000
```

Build for production:

```bash
npm run build
```

## Project Structure

```txt
app/
  page.tsx                 Intro and language selection page
  map/page.tsx             Map page
  branches/[id]/page.tsx   Unit detail page
  layout.tsx               App metadata and AI usage directives
components/
  map/BranchMap.tsx        Leaflet map and marker popups
  map/BranchMapPage.tsx    Map page shell and filter state
  map/MapFilters.tsx       Search and filters
data/
  branches.ts              Curated unit data and verified official URLs
lib/
  filterBranches.ts        Search/filter logic
  format.ts                Labels and locale helpers
  types.ts                 Shared TypeScript types
middleware.ts              AI crawler blocking and robots response headers
public/
  robots.txt               Crawler policy, including AI crawler disallow rules
```

## Data Model

Unit data lives in `data/branches.ts`.

Each unit has:

- English name
- Traditional Chinese display name
- Type: `ward` or `branch`
- Language category
- Status
- Meetinghouse address
- Latitude and longitude
- Region
- Optional verified official church page URL

Official links should only be added when verified. If a unit is discontinued, merged, or not confidently matched to an official page, leave `officialUrl` empty.

## Language Notes

The app currently supports:

- `?lang=zh` for Traditional Chinese
- `?lang=en` for English

For filtering, Mandarin and general Chinese-speaking units are intentionally grouped as `mandarin`, because overseas directory usage often treats Mandarin/Chinese as the same search category.

## Map Notes

The app uses Leaflet with the public OpenStreetMap tile endpoint:

```txt
https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png
```

This is fine for development and light early usage. For larger public traffic, switch to a dedicated tile provider such as MapTiler, Stadia, CARTO, or another provider with explicit production usage terms.

## AI Crawler Protection

The site includes a lightweight crawler protection layer:

- `public/robots.txt` disallows common AI training and answer crawlers.
- `middleware.ts` returns `403` for known AI crawler user agents such as
  `GPTBot`, `ClaudeBot`, `CCBot`, `PerplexityBot`, `Google-Extended`, and
  related crawlers.
- App metadata adds `noai` and `noimageai` directives.

These controls are useful for well-behaved crawlers and obvious AI user agents.
They are not a full security boundary against spoofed user agents or aggressive
scraping. For heavier public traffic, pair this with host-level protections such
as Cloudflare/WAF rules, rate limits, bot challenges, or authenticated access for
sensitive routes.

## Deployment

The app is designed to deploy cleanly on Vercel.

No database or secret environment variables are required for the current version. All unit data is statically bundled from `data/branches.ts`.

## Current Scope

The current directory includes units across:

- United States
- United Kingdom
- Canada
- Australia
- New Zealand

Coordinates and addresses should continue to be reviewed as the dataset grows.
