# Moon Storefront

Moon is a modern React storefront for ceramics, tableware, decor pieces, and editorial-style shopping flows.  
The project is built to stay aligned with the current Figma direction while keeping the codebase clean, reusable, responsive, and JavaScript-only.

## Overview

This project includes the main storefront experience such as:

- Home
- Shop / Categories
- Product Details
- Cart
- Checkout
- Wishlist / Favorites
- Blog
- About
- Contact
- Authentication pages
- Profile page

The UI is built around a shared MUI theme with light and dark mode support, responsive layouts, account-aware wishlist behavior, and API-driven product/cart flows.

## Tech Stack

Core technologies used in the project:

- React 19
- Vite
- JavaScript (no TypeScript in the app source)
- Material UI (MUI)
- Emotion
- React Router DOM
- TanStack React Query
- Axios
- Zustand
- React Hook Form
- Yup
- i18next
- react-i18next
- react-toastify

## Main Libraries And Why They Are Used

### UI / Styling

- `@mui/material`
  Used for the component system, layout, responsive breakpoints, forms, cards, buttons, drawers, and theme integration.

- `@mui/icons-material`
  Used for icons across navbar, actions, wishlist, profile, and other UI elements.

- `@emotion/react` and `@emotion/styled`
  Used internally by MUI for styling and theme-aware component rendering.

- `@fontsource/roboto`
  Used as the main font family inside the project theme.

### Routing

- `react-router-dom`
  Used for application routing, protected routes, navigation, and page structure.

### Data Fetching / API

- `axios`
  Used to communicate with the backend API.

- `@tanstack/react-query`
  Used for server state management, caching, refetching, and keeping API-driven pages responsive and maintainable.

### Forms / Validation

- `react-hook-form`
  Used to manage form state efficiently.

- `yup`
  Used for schema-based validation.

- `@hookform/resolvers`
  Connects Yup validation schemas with React Hook Form.

### State Management

- `zustand`
  Used for lightweight app state such as authentication, theme mode, and wishlist persistence.

### Internationalization

- `i18next`
- `react-i18next`
- `i18next-browser-languagedetector`

Used for Arabic and English support, translation keys, and automatic language handling.

### Notifications

- `react-toastify`
  Used for toast feedback and user notifications.

## Project Structure

The project keeps a familiar frontend structure and reuses existing folders rather than introducing a different architecture.

Main source folders:

- `src/api`
  Axios instances and API configuration

- `src/components`
  Shared UI components such as navbar, footer, product cards, sections, auth wrappers, and common reusable pieces

- `src/hooks`
  Custom hooks for API calls and reusable behavior

- `src/layout`
  Shared page layouts

- `src/pages`
  Route-level pages like Home, Contact, Blog, Checkout, Auth, and Profile

- `src/store`
  Zustand stores for theme, auth, and wishlist state

- `src/ui`
  Additional UI helpers and reusable view-level pieces

- `src/validation`
  Validation schemas for forms

## Theme And Design

The project uses a centralized MUI theme from `src/theme.js` for:

- color palette
- light / dark mode
- typography
- spacing
- shadows
- border radius
- shared UI tokens for repeated sections

This helps keep the interface visually consistent across all pages instead of scattering color values and style decisions across many files.

## Features

Key implemented behavior includes:

- Responsive storefront pages
- Shared light and dark mode with persistence
- Arabic / English language support
- Product listing, filtering, and search support
- Product details with reviews
- Add to cart flow
- Checkout flow
- Protected route behavior
- Account-aware wishlist behavior
- Profile page with user info and orders
- Local image usage aligned with the project visuals

## Available Scripts

Run the development server:

```bash
npm run dev
```

Build the project for production:

```bash
npm run build
```

Run linting:

```bash
npm run lint
```

Preview the production build:

```bash
npm run preview
```

## Notes

- The app source is written in JavaScript.
- Styling is primarily handled through MUI and the shared theme.
- The final source of truth is inside `src`, not the generated `dist` output.
