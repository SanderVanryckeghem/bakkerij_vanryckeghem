# Bakkerij Vanryckeghem

A modern, performant website for Bakkerij Vanryckeghem, a traditional Belgian bakery located in Harelbeke, Belgium. Built with the latest Angular v20 features and best practices.

## Table of Contents

- [Project Overview](#project-overview)
- [Tech Stack](#tech-stack)
- [Key Features](#key-features)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Setup](#setup)
- [Available Commands](#available-commands)
- [Pages and Routes](#pages-and-routes)
- [Development](#development)

## Project Overview

This is a fully responsive, SEO-optimized website showcasing a traditional Belgian bakery's products, services, and information. The site features a modern architecture built with Angular's latest standalone components approach, providing an excellent user experience while maintaining high performance and accessibility standards.

## Tech Stack

- **Angular v20.3.0** - Latest Angular framework with standalone components
- **TypeScript 5.9.2** - Type-safe development
- **TailwindCSS 3.4** - Utility-first CSS framework with custom theme
- **RxJS 7.8** - Reactive programming for async operations
- **ESLint & Prettier** - Code quality and formatting
- **Karma & Jasmine** - Unit testing framework

## Key Features

### Modern Angular Architecture

- **Standalone Components** - No NgModules, fully standalone architecture
- **Signals for State Management** - Leveraging Angular's signal-based reactivity for efficient state management
- **New Control Flow Syntax** - Using `@if`, `@for`, `@defer` for cleaner templates
- **Lazy-Loaded Routes** - All feature routes use `loadComponent` for optimal bundle sizes
- **OnPush Change Detection** - Performance-optimized change detection strategy across all components
- **Inject Function** - Modern dependency injection pattern using `inject()` instead of constructor injection

### SEO and Accessibility

- **Meta Tags Management** - Dynamic meta tags for each page via `SeoService`
- **Structured Data (JSON-LD)** - Schema.org markup for bakery information, opening hours, and location
- **Semantic HTML** - Proper heading hierarchy and semantic elements
- **ARIA Attributes** - Accessibility attributes for screen readers and assistive technologies
- **Responsive Images** - Optimized images with proper alt text

### Data Management

- **ContentService** - Centralized service loading content from JSON files:
  - Products (`assets/data/products.json`)
  - Categories (`assets/data/categories.json`)
  - FAQ items (`assets/data/faq.json`)
  - Opening hours (`assets/data/opening-hours.json`)
  - Bakery information (`assets/data/bakery-info.json`)
  - Popup configuration (`assets/data/popup.json`)
- **Image Preloading** - Automatic preloading of product images for better UX
- **Signal-Based State** - All data exposed as signals for reactive updates

### Styling and Design

- **Custom TailwindCSS Theme** - Bakery-themed design system with:
  - Custom color palette (warm browns, creams, golds)
  - Typography scale optimized for readability
  - Custom shadows and border radius
  - Responsive breakpoints
- **SCSS Support** - Component-scoped styles where needed
- **Mobile-First Responsive** - Fully responsive design for all devices

### Performance

- **Lazy Loading** - Routes and components loaded on demand
- **OnPush Change Detection** - Minimized change detection cycles
- **Signal-Based Reactivity** - Efficient reactive updates
- **Image Preloading** - Strategic preloading of critical images
- **Production Build Optimization** - Minification, tree-shaking, and AOT compilation

## Project Structure

```
src/app/
├── core/                    # Core functionality
│   └── services/
│       └── seo.service.ts   # SEO and meta tags management
├── features/                # Feature modules (lazy-loaded)
│   ├── home/               # Homepage
│   ├── assortiment/        # Product catalog
│   ├── over-ons/           # About us page
│   ├── contact/            # Contact information
│   ├── bestellen/          # Order information
│   └── not-found/          # 404 page
├── layouts/                # Layout components
│   ├── header/             # Site header with navigation
│   └── footer/             # Site footer
├── shared/                 # Shared resources
│   ├── components/         # Reusable UI components
│   │   ├── button/
│   │   ├── card/
│   │   ├── category-card/
│   │   ├── hero/
│   │   ├── popup/
│   │   └── index.ts        # Barrel export
│   ├── constants/          # Application constants
│   ├── models/             # TypeScript interfaces and types
│   ├── pipes/              # Custom pipes
│   ├── services/           # Shared services
│   │   ├── content.service.ts       # Content data management
│   │   └── image-preload.service.ts # Image preloading
│   └── styles/             # Shared styles and theme
│       └── colors.js       # TailwindCSS color configuration
├── app.config.ts           # Application configuration
├── app.routes.ts           # Route definitions
├── app.ts                  # Root component
└── app.html                # Root template
```

## Prerequisites

- **Node.js** v18 or higher
- **npm** v9 or higher

## Setup

1. Clone the repository:

```bash
git clone https://github.com/SanderVanryckeghem/bakkerij_vanryckeghem.git
cd bakkerij_vanryckeghem/bakkerij_vanryckeghem
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm start
```

The application will be available at `http://localhost:4200/`

## Available Commands

### Development

- `npm start` - Start development server at http://localhost:4200/
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

## Pages and Routes

| Route          | Component     | Description                                    |
| -------------- | ------------- | ---------------------------------------------- |
| `/`            | Home          | Homepage with hero section and featured items  |
| `/assortiment` | Assortiment   | Product catalog with categories and filtering  |
| `/over-ons`    | OverOns       | About us page with bakery history and values   |
| `/contact`     | Contact       | Contact information and opening hours          |
| `/bestellen`   | Bestellen     | Order information and instructions             |
| `/**`          | NotFound      | 404 error page for invalid routes              |

All routes use lazy loading via `loadComponent` for optimal performance.

## Development

### File Naming Convention

Components and Angular artifacts use the `.ts` extension directly (not `.component.ts`):

- `hero.ts` instead of `hero.component.ts`
- `button.ts` instead of `button.component.ts`
- `home.ts` instead of `home.component.ts`

### Coding Standards

- **Standalone Components Only** - No NgModules
- **Signal-Based Reactivity** - Use `signal()`, `computed()`, `effect()`
- **Modern Control Flow** - Use `@if`, `@for`, `@defer`
- **Inject Function** - Use `inject()` for dependency injection
- **OnPush Change Detection** - All components use `ChangeDetectionStrategy.OnPush`
- **TypeScript Strict Mode** - Strict type checking enabled

### Adding New Content

Content is managed through JSON files in `assets/data/`. To add or modify content:

1. Edit the relevant JSON file (products, categories, faq, etc.)
2. The `ContentService` will automatically load the updated data
3. Changes will be reflected across the application

### Styling Guidelines

- Use TailwindCSS utility classes for most styling
- Custom theme variables are defined in `tailwind.config.js`
- Component-specific SCSS only when necessary
- Follow mobile-first responsive design principles

## Additional Resources

- [Angular Documentation](https://angular.dev)
- [Angular CLI Reference](https://angular.dev/tools/cli)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)

## License

Private project for Bakkerij Van Ryckeghem.