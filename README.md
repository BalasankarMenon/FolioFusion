# FolioFusion
A sleek developer portfolio generator built with Next.js, Node.js, and MongoDB.

Developer portfolio generator built with Next.js (App Router), Node.js, and MongoDB (Mongoose).

This repository contains a small app that lets users register/login and create a developer portfolio (profile) with sections like skills, experience, projects, education, achievements and an avatar image. The API is implemented with Next.js App Router route handlers and MongoDB is used as the persistent store.

## Key features

- Create and update a portfolio (profile) including arrays of skills, experience, projects, education, achievements and certifications
- Image upload (stored as base64 in the database)
- Authentication with JWT (login/verify endpoints)
- Simple client UI for editing a profile at `src/app/profile-form/[username]/page.js`

## Tech stack

- Next.js (App Router)
- React (client components)
- Node.js
- MongoDB Atlas (Mongoose)
- Framer Motion (UI animations)

## Quick start

Prerequisites:

- Node.js 18+ (or the version in your environment)
- npm or pnpm
- A MongoDB connection string (MongoDB Atlas or self-hosted)

1. Clone the repo

```bash
git clone git@github.com:BalasankarMenon/FolioFusion.git
cd FolioFusion
```

2. Install dependencies

```bash
npm install
# or
pnpm install
```

3. Create a `.env` file in the project root with at least the following variables:

```env
MONGO_URI=your_mongo_connection_string
JWT_SECRET=some_long_random_secret
```

4. Start the dev server

```bash
npm run dev
# or
pnpm dev
```

Open (https://folio-fusion.vercel.app/) and test the app.

## Project structure (important files)

- `lib/db.js` — MongoDB connection helper (caches the connection in development)
- `lib/models/schema.js` — Mongoose `Profile` schema and model
- `src/app/api/profile/route.js` — profile GET/POST handlers (create & update)
- `src/app/api/login/route.js` — login (returns JWT) and user endpoints
- `src/app/api/registration/route.js` — registration endpoint
- `src/app/profile-form/[username]/page.js` — client-side profile editor and form

## API (short reference)

- `POST /api/registration` — register a new user. Expects JSON `{ name, password, email }`.
- `POST /api/login` — login with `{ name, password }`, returns `{ success: true, token }` on success.
- `POST /api/verify` — verify JWT (used by the client to allow access to edit pages).
- `GET /api/profile?name=<name>` — fetch profile by `name` (returns `{ success: true, profile }`).
- `POST /api/profile` — create or update a profile. Expects FormData with fields and arrays as JSON-strings; `image` may be sent as a file. Returns `{ success: true, profile }`.
- `GET /api/test` — simple DB health check endpoint.

Notes: the API responses currently use a `{ success: boolean, profile?, error? }` shape in many endpoints — check the route implementations for exact behavior.

## Security & recommended changes

- The app uses JWT tokens stored in `localStorage`. For higher security consider using httpOnly cookies.
- Right now profile lookup/update can be done by `name` (or `_id` if provided). It's recommended to use the authenticated user's id (from the JWT) to find and update profiles server-side to prevent spoofing.
- Make sure `.env` is added to `.gitignore` and never committed.

## Debugging tips

- If the frontend does not show saved data:
	- Check the browser DevTools → Network for the POST `/api/profile` response and the GET `/api/profile?name=...` response.
	- Check the server terminal for stack traces when saving/fetching.
	- Verify your `MONGO_URI` is correct and the DB has documents (use MongoDB Compass to inspect the collection).
- If you see hook-order errors in React (e.g. "final argument passed to useEffect changed size"), ensure hooks are not called conditionally and keep hook order stable.

## Tests / validation

There are no automated tests included yet. Add a small integration test for the save → fetch flow or a Postman collection to validate endpoints.

## Contributing

PRs welcome. If you change API shapes or authentication behavior, update this README and add small tests demonstrating the flow.

## License

This project currently has no explicit license in the repo. 




