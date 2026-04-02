# DevFolio AI

DevFolio AI is a MERN stack portfolio builder for developers. It includes JWT authentication, a portfolio dashboard with live preview, and a mock AI assistant that improves bio or project copy.

## Structure

- `backend/`: Express API, MongoDB models, JWT auth, portfolio routes, AI route
- `frontend/`: React + Vite + Tailwind client

## Backend

1. Copy `backend/.env.example` to `backend/.env`
2. Update `MONGODB_URI`, `JWT_SECRET`, and `CLIENT_URL`
3. Install dependencies:

```bash
npm install --prefix backend
```

4. Start the API:

```bash
npm run dev --prefix backend
```

## Frontend

1. Install dependencies:

```bash
npm install --prefix frontend
```

2. Start the client:

```bash
npm run dev --prefix frontend
```

## Full app

From the project root:

```bash
npm install
npm run install:all
npm run dev
```

The frontend expects the backend at `http://localhost:5000/api` by default.

## Deploy

This project is prepared for a split deployment:

- `backend/` as a Node web service
- `frontend/` as a static site

### Render

Use the root [render.yaml](C:\Users\sthan\Documents\DevFolio-AI\render.yaml) blueprint.

Set these environment variables on Render:

- Backend:
  - `MONGODB_URI`
  - `JWT_SECRET`
  - `CLIENT_URL`
  - `OPENAI_API_KEY` (optional)
- Frontend:
  - `VITE_API_URL`

Recommended values:

- `CLIENT_URL=https://<your-frontend-domain>`
- `VITE_API_URL=https://<your-backend-domain>/api`

### Vercel

This project also includes [vercel.json](C:\Users\sthan\Documents\DevFolio-AI\vercel.json) for a single Vercel deployment:

- React frontend is built from `frontend/`
- Express API is served through `api/server.js`

Set these environment variables in Vercel:

- `MONGODB_URI`
- `JWT_SECRET`
- `CLIENT_URL`
- `OPENAI_API_KEY` (optional)
- `VITE_API_URL`

Recommended values:

- `CLIENT_URL=https://<your-vercel-domain>`
- `VITE_API_URL=/api`
