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

- Next.js App Router
- TypeScript
- React
- Leaflet
- OpenStreetMap tile layer
- Plain CSS in `app/globals.css`

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
