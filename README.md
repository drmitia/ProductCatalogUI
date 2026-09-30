# Product Catalog

A single-page Angular application for browsing and administering a product catalog, with the ability to import products from a category page URL (e.g. prom.ua).

## Tech stack

- **Angular 22** (standalone components, zoneless change detection based on signals)
- **RxJS** — HTTP requests and auth streams
- **Bootstrap 5** — styling

## Repository structure

```
client/   Angular application (frontend)
```

This repository does not include the backend (REST API), the app expects an API to already be running separately (by default at `http://localhost:5137/api`, see `client/src/environments`).

## Running

```bash
cd client
npm install
npm start
```

The app will be available at `http://localhost:4200/`.

Before running it, make sure the backend API is reachable at the address configured in `client/src/environments/environment.development.ts` (`apiUrl`).

## Features

- **Product catalog** (`/`) — paginated list of products with image, name and description; a description can be expanded with a "Show more" / "Show less" button.
- **Login** (`/login`) — email/password authentication; the token is stored and automatically attached to requests via an HTTP interceptor.
- **Administration** (available only to users with the `Admin` role):
  - adding (`/products/new`) and editing (`/products/:id/edit`) a product;
  - deleting a product from the catalog;
  - importing products from a category page URL (`/import`).

## Main commands

| Command         | Description                       |
|-----------------|------------------------------------|
| `npm start`     | Start the dev server (`ng serve`)  |
| `npm run build` | Production build into `client/dist/` |
