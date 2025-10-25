# Bakkerij Van Ryckeghem

Website for Bakkerij Van Ryckeghem - A traditional Belgian bakery in Zulte.

Built with Angular v20, TailwindCSS, and TypeScript.

## Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher)

## Setup

1. Clone the repository:
```bash
git clone https://github.com/SanderVanryckeghem/bakkerij_vanryckeghem.git
cd bakkerij_vanryckeghem
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

## Available Scripts

- `npm start` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting
- `npm test` - Run unit tests

## Project Structure

```
src/
├── app/
│   ├── core/              # Core services, guards, interceptors
│   ├── shared/            # Shared components, directives, pipes
│   ├── features/          # Feature modules (home, assortiment, etc.)
│   ├── layouts/           # Layout components (header, footer)
│   └── app.ts             # Root component
├── environments/          # Environment configurations
└── styles.scss            # Global styles
```

## Development server

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
