# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

React 18 + Vite + Tailwind CSS frontend for the DawlyStor multi-vendor marketplace. Paired with a Laravel backend at `D:/code/dawlyStor_backend-main` running on port 8000.

## Commands

```bash
npm run dev      # start Vite dev server at http://localhost:5173
npm run build    # production build
npm run preview  # preview production build
```

No test runner or linter is configured in this project.

## Architecture

### Data Flow

All pages fetch from the Laravel API at `VITE_APP_API_BASE_URL` (default `http://127.0.0.1:8000`). `src/data/mockData.js` is a **fallback only** — used in `.catch()` handlers when API calls fail. Never use mock data as the primary source.

Every `useEffect` that fetches data must:
1. Create an `AbortController` and pass `{ signal: controller.signal }` to `fetch`
2. Check `err.name !== "AbortError"` before setting error state
3. Return `() => controller.abort()` as cleanup

### Category Filter Convention

Category filters use the **store category ID** (integer from the API) as the `?category=` URL param. This is matched in `Products.jsx` against `product.store.category_id`. All three entry points must stay in sync:
- `CategoryBar.jsx` — fetches `/api/customer/store-categories`, links `?category={cat.id}`
- `CategoryCard.jsx` — links `?category={category.id}`  
- `Products.jsx` sidebar — sets `?category={storeCategory.id}`

Never use `category.slug` as the filter key — the Products page doesn't match on slugs.

### URL as State (Products page)

`Products.jsx` derives all filter values directly from `new URLSearchParams(location.search)` during render — they are **not** stored in React state. Filter changes call `navigate()` from event handlers (`onChange`, `onClick`). There are no useEffect hooks to sync URL ↔ state.

### ProductCard Field Normalisation

API products and mock products have different field shapes. `ProductCard.jsx` normalises both:

```js
const image    = product.image || product.images?.[0] || null;
const vendor   = product.vendor || product.store?.name || "";
const oldPrice = product.oldPrice ?? product.compare_price;
const rating   = typeof product.rating === "object"
  ? parseFloat(product.rating?.value || 0)
  : (product.rating || 0);
const url      = `/products/${product.slug || product.id}`;
```

### Theme System

`ThemeContext` (`src/context/ThemeContext.jsx`) is the single source of truth for dark/light mode. It sets `data-theme` on `<html>` and persists to `localStorage`. All components use CSS variables — never hardcoded Tailwind dark classes:

```
--bg, --text, --card, --border, --muted, --nav
```

### Store/Seller Routing

Store detail pages use slug-based routing: `/store/{slug}`. Links that navigate to a store must use `seller.slug || seller.id` as the param. The backend `GET /api/customer/stores/{slug}` returns `{ store, products }` nested under `data.data`.

### Home Page Sections

`Home.jsx` fetches `/api/customer/home` which returns a `sections` array. Each section has a `type` field. Data is extracted with:
```js
const getSection = (type) => sections.find((s) => s.type === type);
const vendors    = getSection("stores")?.data?.stores || [];
const categories = getSection("categories")?.data?.categories || [];
const products   = getSection("products")?.data?.products || [];
```
Section types: `hero`, `features`, `products`, `categories`, `stores`, `vendor_cta`.
