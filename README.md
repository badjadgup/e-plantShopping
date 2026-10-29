# Paradise Nursery — Houseplant Shopping Application

**Repository name:** e-plantShopping

**Live application:** https://badjadgup.github.io/e-plantShopping/

A React and Redux Toolkit shopping application built from scratch for the **Developing Front-End Apps with React** final project.

**Project name:** Paradise Nursery Shopping Application

## Features

- Landing page with an original greenhouse background image, the Paradise Nursery company name, company information, and a **Get Started** button.
- 18 distinct plants, organized into three collections with six plants each. Every plant has a thumbnail, name, description, price, and Add to Cart button.
- Shared navigation for Home, Plants, and Cart. The cart icon displays the total number of units dynamically.
- Add to Cart buttons become disabled after addition and become available again when that plant is removed from the cart.
- Redux reducers `addItem`, `removeItem`, and `updateQuantity` manage the cart.
- Cart rows show a thumbnail, name, unit price, quantity controls, line total, and Delete button.
- Total plant quantity and total cost update immediately when quantities change or items are removed.
- Decreasing a quantity of one removes that item. Invalid negative or fractional quantities are ignored by the reducer.
- Continue Shopping returns to the product listing. Checkout displays **Coming Soon!**
- Responsive layouts, descriptive control labels, keyboard focus indicators, and empty-cart state.

## Run locally

Requires Node.js 20.19+ or 22.12+ and npm.

```sh
npm ci
npm run dev
```

```sh
npm test
npm run build
npm run preview
```

## Key source files

| File | Responsibility |
| --- | --- |
| `src/AboutUs.jsx` | Company information |
| `src/App.css` | Landing background image and responsive styles |
| `src/App.jsx` | Landing page, Get Started state handler, hash navigation |
| `src/CartSlice.jsx` | Redux shopping cart reducers and selectors |
| `src/ProductList.jsx` | Shared Navbar, 18 plants in three categories, and Add to Cart behavior |
| `src/CartItem.jsx` | Shopping cart quantities, removal, totals, checkout message |
| `src/store.js` | Redux store configuration |

## Deployment

The included GitHub Actions workflow tests and builds the app, then publishes `dist/` to GitHub Pages. In repository **Settings → Pages → Build and deployment**, choose **GitHub Actions**. Hash navigation and relative build paths support deployment under a repository subdirectory.

## Assets and project scope

All 18 botanical SVG thumbnails, the greenhouse SVG background, and the favicon are original illustrations created for this project. Fonts use Google Fonts with local serif and sans-serif fallbacks. This is a front-end demonstration: no real orders or payments are processed, and cart state resets on refresh.

## Development disclosure

This project was created with AI assistance. Review your course's rules on AI assistance and understand the implementation before using any of it in an assessment.
