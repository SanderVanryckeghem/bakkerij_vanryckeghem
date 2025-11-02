# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Angular v20 website for Bakkerij Van Ryckeghem, a traditional Belgian bakery. Built with standalone components, TailwindCSS for styling, and TypeScript.

## Commands

All commands must be run from the `bakkerij_vanryckeghem/` subdirectory (not the repo root).

### Development
- `npm start` - Start dev server at http://localhost:4200/
- `npm run watch` - Build with watch mode for development

### Building
- `npm run build` - Production build (outputs to `dist/`)

### Code Quality
- `npm run lint` - Run ESLint on all TypeScript files
- `npm run lint:fix` - Auto-fix ESLint errors
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting without modifying

### Testing
- `npm test` - Run unit tests with Karma

## Architecture

### File Naming Convention
Components, directives, and other Angular artifacts use the `.ts` extension directly (not `.component.ts`). For example: `hero.ts`, `button.ts`, `home.ts`.

### Directory Structure
```
src/app/
├── core/              # Core functionality (guards, interceptors)
├── features/          # Feature modules, each with its own route
│   ├── home/
│   ├── assortiment/
│   ├── over-ons/
│   ├── contact/
│   ├── bestellen/
│   └── not-found/
├── layouts/           # Header and footer components
└── shared/
    ├── components/    # Reusable UI components (button, card, hero, etc.)
    ├── constants/     # Application constants (categories)
    ├── models/        # TypeScript interfaces/types
    ├── services/      # Shared services
    ├── directives/    # Custom directives
    ├── pipes/         # Custom pipes
    └── styles/        # Shared styles and Tailwind color configuration
```

### Routing
All routes use lazy loading with `loadComponent`. Routes defined in `app.routes.ts`.

### Data Management
`ContentService` (`shared/services/content.service.ts`) provides all application data:
- Mock product data
- Bakery information (contact, VAT, hours)
- FAQ items
- Opening hours (imported from `OPENING_HOURS` constant)

This is currently a static site with hardcoded data. No backend integration exists.

### Styling
- **TailwindCSS** for utility classes
- Custom theme configuration in `tailwind.config.js` with:
  - Custom color palette from `shared/styles/colors.js`
  - Custom font families, sizes, spacing, and shadows
  - Bakery-themed design tokens
- **SCSS** for component-specific styles (though most components use Tailwind)
- Global styles in `src/styles.scss`

### Component Architecture
- All components are **standalone** (no NgModules)
- Shared components in `shared/components/` with barrel export via `index.ts`
- Feature components in `features/{feature-name}/{feature-name}/{feature-name}.ts`

## Important Notes

- The actual Angular project is in the `bakkerij_vanryckeghem/` subdirectory, not the repo root
- No package.json exists in the repo root - always work from the subdirectory
- Prettier config is embedded in `package.json` with printWidth: 100 and singleQuote: true
