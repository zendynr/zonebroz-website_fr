# Product Audit & Review Platform

A frontend-first, interactive slide-based product audit system for rendering premium, narrative-driven product review reports.

## Overview

This platform transforms structured product audit data into beautiful, interactive slide presentations with animations, charts, and evidence. The system is designed to be **backend-agnostic** - all infrastructure (auth, database, storage) is abstracted and mocked, allowing backend integration without UI rewrites.

## Features

### Core System
- **Slide-based Navigation**: Snap-to-slide navigation with keyboard and button controls
- **Dynamic Slide Generation**: Slides are generated from report data, not manually authored
- **Tier-based Visibility**: Different user tiers (snapshot, full, investor) see different content
- **Review Framework**: 12 fixed categories with 0-10 scoring
- **Findings System**: Priority calculation based on impact, effort, and confidence
- **Media Support**: Images and videos (≤10s) with mocked URLs

### Slide Types
1. **Hero/Summary**: Overall score and key highlights
2. **Score Breakdown**: Visual chart of all category scores
3. **Insight**: Category-specific insights
4. **Evidence**: Finding details with media evidence
5. **Deep Dive**: Scrollable detailed analysis (tier-gated)
6. **Urgent Fixes**: High-priority findings requiring immediate attention
7. **Roadmap**: Product improvement roadmap
8. **Final Verdict**: Summary with strengths, weaknesses, and next steps

### Admin Interface
- Create/edit reports with mocked data
- Enter category scores
- Add/edit findings with priority metrics
- Manage roadmap items
- Preview reports in real-time

### Animation & UX
- GSAP animations for slide entry
- Respects `prefers-reduced-motion`
- Print mode support
- Responsive design

## Tech Stack

- **React 18** with TypeScript
- **Vite** for build tooling
- **GSAP** for animations
- **Recharts** for data visualization
- **Lucide React** for icons

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Build

```bash
npm run build
```

## Project Structure

```
src/
├── components/          # React components
│   ├── slides/         # Individual slide components
│   ├── AdminPanel.tsx  # Admin interface
│   ├── ReportViewer.tsx
│   ├── SlideContainer.tsx
│   └── MediaRenderer.tsx
├── context/            # React contexts
│   ├── UserContext.tsx # Mocked user/auth
│   └── PrintContext.tsx
├── data/               # Mock data
│   └── mockData.ts
├── types/              # TypeScript definitions
│   └── index.ts
├── utils/              # Utility functions
│   ├── priority.ts     # Finding priority calculation
│   ├── slides.ts       # Slide generation logic
│   └── tier.ts         # Tier-based visibility
├── App.tsx             # Main app component
├── main.tsx            # Entry point
└── index.css           # Global styles
```

## Data Models

### Report
```typescript
{
  id: string
  meta: ReportMeta
  categoryScores: CategoryScore[]
  findings: Finding[]
  competitors: Competitor[]
  roadmap: RoadmapItem[]
}
```

### Finding Priority
Priority is calculated using: `urgency = (impact * confidence) / effort`

Findings are automatically grouped into:
- **Fix Now**: urgency ≥ 3.0
- **Next**: urgency ≥ 1.5
- **Nice to Have**: urgency < 1.5

## User Tiers

- **snapshot**: Basic view
- **full**: Full access including deep dive
- **investor**: Full access (same as full for now)

Tier controls which slides and sections are visible, but doesn't change layouts or create separate code paths.

## Mocked Infrastructure

The following are designed for but not implemented (mocked):

- ✅ Authentication (mocked `CurrentUser` context)
- ✅ Authorization (feature visibility via `canView()`)
- ✅ Database (local state/mocked JSON)
- ✅ File storage (static URLs)
- ✅ PDF export (print mode flag)
- ✅ Billing/payments (feature flags)

## Backend Integration

When integrating a backend:

1. **Replace UserContext**: Swap the mocked provider with real auth
2. **Add API calls**: Replace local state with API calls
3. **Implement storage**: Replace static URLs with real file storage
4. **Add persistence**: Save reports to database

The frontend is structured so backend integration requires **no UI rewrites** - only provider/context replacements.

## Development Notes

- All slides are dynamically generated from report data
- Animations respect `prefers-reduced-motion` and print mode
- Media URLs are mocked (placeholder images for now)
- Admin panel saves are mocked (console.log only)
- No real authentication - user role/tier is set in context

## License

MIT
