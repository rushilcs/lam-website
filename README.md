# Lakshmi Mulgund Portfolio

A modern, minimalist portfolio website built with Next.js (App Router), React, TypeScript, and Tailwind CSS. Features smooth animations inspired by [Anoushka Buch](https://www.anoushkabuch.com/) and [Michelle Liu](https://www.liumichelle.com/).

## Features

- **Animated Card Grid**: Work items displayed in a responsive grid with hover effects
- **Shared Element Transitions**: Cards expand into detailed modals using Framer Motion's `layoutId` for smooth morphing animations
- **Accessibility**: Full keyboard navigation (ESC to close), ARIA labels, focus management, and scroll locking
- **Responsive Design**: Mobile-first approach with adaptive layouts
- **SEO Optimized**: Metadata and OpenGraph tags for all pages

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Deployment**: Vercel (ready)

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
npm run build
npm start
```

## Project Structure

```
lakshmi-website/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── layout.tsx          # Root layout with Navbar & Footer
│   │   ├── page.tsx            # Home/Work page
│   │   ├── about/
│   │   │   └── page.tsx        # About page
│   │   └── gallery/
│   │       └── page.tsx        # Gallery page
│   ├── components/             # React components
│   │   ├── Navbar.tsx          # Sticky navigation
│   │   ├── WorkCard.tsx        # Individual work card with hover
│   │   ├── CardGrid.tsx        # Grid container for work items
│   │   ├── ExpandableCardModal.tsx  # Modal with shared element animation
│   │   ├── Overlay.tsx         # Dimmed background overlay
│   │   └── Footer.tsx          # Footer with contact info
│   └── content/
│       └── content.ts          # Single source of truth for all content
├── public/
│   └── projects/               # Project images
└── package.json
```

## Editing Content

All content is centralized in `/src/content/content.ts`. Edit this file to update:

- **Profile information**: Name, tagline, bio, roles, education, contact
- **Work items**: Add, remove, or modify projects in the `workItems` array
- **Gallery images**: Update the `galleryImages` array

### Work Item Structure

```typescript
{
  id: string;                    // Unique identifier
  title: string;                  // Project title
  categories: string[];           // Tags (e.g., ["Photography", "Portrait"])
  shortDescription: string;       // Brief description for card
  coverImage?: string;            // Path to image (e.g., "/projects/project1.png")
  detailContent: string;          // Full description (supports **bold** for headings)
  externalLink?: string;          // Optional external URL
}
```

### Adding Images

1. Place images in `/public/projects/`
2. Reference them in `content.ts` as `/projects/filename.png`

## Animation Details

The card expansion animation uses Framer Motion's `layoutId` prop to create a shared element transition:

1. **Hover**: Card lifts slightly (`translateY: -8px`) with increased shadow
2. **Click**: Card morphs into modal using the same `layoutId`
3. **Modal**: Background dims, content fades in with stagger
4. **Close**: Animation reverses, card returns to original position

## Deployment

The site is ready for Vercel deployment:

1. Push to GitHub
2. Import project in Vercel
3. Deploy (automatic on push)

No environment variables required.

## Files Created/Modified

### New Files
- `package.json` - Next.js dependencies
- `tsconfig.json` - TypeScript configuration
- `next.config.js` - Next.js configuration
- `tailwind.config.ts` - Tailwind CSS configuration
- `postcss.config.js` - PostCSS configuration
- `.eslintrc.json` - ESLint configuration
- `.gitignore` - Git ignore rules
- `src/app/layout.tsx` - Root layout
- `src/app/page.tsx` - Home/Work page
- `src/app/about/page.tsx` - About page
- `src/app/gallery/page.tsx` - Gallery page
- `src/app/globals.css` - Global styles
- `src/components/Navbar.tsx` - Navigation component
- `src/components/WorkCard.tsx` - Work card component
- `src/components/CardGrid.tsx` - Card grid container
- `src/components/ExpandableCardModal.tsx` - Modal component
- `src/components/Overlay.tsx` - Overlay component
- `src/components/Footer.tsx` - Footer component
- `src/content/content.ts` - Content source file

### Note
The old Vite/React structure in `/client` can be removed once you've confirmed the Next.js site is working correctly.
