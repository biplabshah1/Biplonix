# BIPLONIX store (React + Vite)

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in /dist
```

- Products live in `src/data/products.js`.
- Cart state: `src/context/CartContext.jsx` (saved to localStorage).
- Colours and layout: `src/index.css` (CSS variables at the top).
- Checkout is a demo. Add Stripe/PayPal plus a backend before taking real orders.
- When hosting `dist/`, configure your host to serve `index.html` for all routes (SPA fallback).
