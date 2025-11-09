# Bakkerij Vanryckeghem Website

Modern Angular website voor Bakkerij Vanryckeghem, een traditionele Belgische bakkerij in Harelbeke.

## Technologie Stack

- **Angular v20** - Standalone components architectuur
- **TypeScript** - Type-safe development
- **TailwindCSS** - Utility-first styling
- **SCSS** - Component-specific styles

## Project Structuur

Het Angular project bevindt zich in de `bakkerij_vanryckeghem/` subdirectory.

```
bakkerij_vanryckeghem/
├── src/
│   ├── app/
│   │   ├── core/              # Guards, interceptors
│   │   ├── features/          # Feature modules (home, assortiment, over-ons, etc.)
│   │   ├── layouts/           # Header en footer
│   │   └── shared/
│   │       ├── components/    # Herbruikbare UI componenten
│   │       ├── constants/     # Applicatie constanten
│   │       ├── models/        # TypeScript interfaces
│   │       └── services/      # Shared services (ContentService)
│   └── public/
│       └── images/           # Statische afbeeldingen
```

## Setup & Development

Alle commands moeten worden uitgevoerd vanuit de `bakkerij_vanryckeghem/` directory:

```bash
cd bakkerij_vanryckeghem
npm install
npm start
```

De applicatie draait op `http://localhost:4200/`

## Beschikbare Scripts

- `npm start` - Start development server
- `npm run build` - Production build
- `npm run watch` - Build met watch mode
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Auto-fix ESLint errors
- `npm run format` - Format code met Prettier
- `npm run format:check` - Check formatting
- `npm test` - Run unit tests

## Content Beheer

Alle website content wordt beheerd vanuit één centrale service:

**`src/app/shared/services/content.service.ts`**

Hier kun je aanpassen:
- Producten (brood, gebak, specialiteiten)
- Categorieën voor de homepage
- Bakkerij informatie (contact, openingstijden, BTW)
- FAQ items
- Openingsuren

## Features

- ✅ Responsive design
- ✅ Lazy loading routes
- ✅ Category filtering met query parameters
- ✅ Timeline component voor geschiedenis
- ✅ FAQ accordion
- ✅ Contact informatie met social media links
- ✅ Product showcase met categorieën

## Styling

- Custom Tailwind configuratie met bakkerij kleuren
- Globale styles in `src/styles.scss`
- Component-specific SCSS bestanden
- Custom fonts en spacing configuratie

## Browser Support

Moderne browsers (Chrome, Firefox, Safari, Edge)
