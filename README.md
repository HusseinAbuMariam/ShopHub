# DawlyStor Frontend

Multi-vendor marketplace storefront built with React 18 + Vite + Tailwind CSS. Connects to the Laravel backend at `D:/code/dawlyStor_backend-main`.

## Setup

```bash
npm install
npm run dev      # http://localhost:5173
npm run build
npm run preview
```

## Environment

Create a `.env` file in the project root:
    
```env
VITE_APP_API_BASE_URL=http://localhost:8000
```

The backend must be running (`php artisan serve`) with `APP_URL=http://localhost:8000` in its `.env`.

## Pages & Routes

| Route | Page | Notes |
|---|---|---|
| `/` | Home | Fetches `/api/customer/home` sections |
| `/products` | Products | `?category={id}` filters by store category ID |
| `/products/:id` | ProductDetails | — |
| `/store/:id` | Store | Slug-based routing |
| `/sellers` | Sellers | Lists all stores |
| `/vendors` | Vendors | Lists all stores |
| `/cart` | Cart | — |
| `/wishlist` | Wishlist | — |
| `/checkout` | Checkout | — |
| `/success` | OrderSuccess | — |
| `/account` | Account | — |
| `/contact` | Contact | — |
| `/faq` | FAQ | — |

## Key Architecture Decisions

### Category Filtering

Category filters always use the **store category ID** (integer) as the `?category=` URL param, matched against `product.store.category_id` from the API. All three entry points must use the same key:
- `CategoryBar` (nav) — fetches `/api/customer/store-categories`, links to `?category={id}`
- `CategoryCard` (home page) — links to `?category={category.id}`
- `Products.jsx` sidebar — sets `?category={storeCategory.id}`

### URL as Filter State (Products page)

Filter values (`category`, `search`, `min`, `max`) live only in the URL — not in React state. Derived during render from `new URLSearchParams(location.search)`. Filter changes call `navigate()` directly from event handlers.

### API Data vs Mock Data

`src/data/mockData.js` is a fallback only, used when API calls fail. `ProductCard.jsx` normalises field differences between sources:

| Field | API | Mock fallback |
|---|---|---|
| Image | `product.images[0]` | `product.image` |
| Vendor | `product.store.name` | `product.vendor` |
| Old price | `product.compare_price` | `product.oldPrice` |
| Rating | `{ value, count }` object | plain number |
| URL | `/products/${product.slug}` | `/products/${product.id}` |

### Theme

Dark/light mode via CSS variables (`--bg`, `--text`, `--card`, `--border`, `--muted`, `--nav`). `ThemeContext` stores the preference in `localStorage` and sets `data-theme` on `<html>`. All components use `var(--*)` tokens.
