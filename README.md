# Vehicle Selector + Logbook Upload

A small full‑stack app to select a vehicle (Make → Model → Badge) and upload a plain‑text service logbook. The frontend (Next.js App Router) posts the selection + uploaded file to a Node/Express API, and the API responds with the selection and the logbook contents.

## Tech stack

- **Frontend:** Next.js 14 (App Router), React 18, TypeScript, Axios
- **Backend:** Node.js, Express, Multer (multipart upload), CORS

## Requirements covered

- Cascading dropdowns: **Make → Model → Badge**
- If Make changes: **Model + Badge are cleared**
- If Model changes: **Badge is cleared**
- Upload is enabled only after a Badge is selected
- Two “quick select” buttons prefill common vehicles
- Form posts to a Node server; response includes `{ make, model, badge, logbook }`

## Repo layout

- `frontend/` — Next.js UI
- `backend/` — Express API

## Prerequisites

- **Node.js >= 18.17** (Next.js 14 requirement)
  - If you use `nvm`, you can run `nvm use 18.17.0` in both folders.

## Setup

Install dependencies in both apps:

```zsh
cd backend
npm install

cd ../frontend
npm install
```

## Run (development)

### 1) Start the backend API

```zsh
cd backend
npm run dev
```

- Listens on `http://localhost:4000`
- Endpoint: `POST /vehicle`

### 2) Start the frontend

```zsh
cd frontend
nvm use 18.17.0
npm run dev
```

- Default URL: `http://localhost:3000` (Next may pick another port if busy)

## How to use

1. Pick a **Make**.
2. Pick a **Model** (options depend on Make).
3. Pick a **Badge** (options depend on Model).
4. Upload a `.txt` logbook.
5. Click **Submit**.

The UI will render the JSON response (including the text content of the uploaded file).

## API contract

### `POST /vehicle`

- **Content-Type:** `multipart/form-data`
- **Fields**
  - `make` (string)
  - `model` (string)
  - `badge` (string)
  - `logbook` (file, plain text)

**Response (JSON)**

```json
{
  "make": "tesla",
  "model": "Model 3",
  "badge": "Performance",
  "logbook": "<contents of uploaded file>"
}
```

## Implementation notes

- Frontend posts using Axios from `frontend/src/components/VehicleForm.tsx`.
- Backend uses Multer to store an uploaded file temporarily under `backend/uploads/`, reads it, then deletes it.
- CORS is enabled in `backend/src/server.js` to allow the frontend to call the API during development.

## Troubleshooting

### `PageNotFoundError: Cannot find module for page: /_document` or missing chunk errors

This commonly happens when a dev server is running while building, or when `.next` is stale.

Fix:

```zsh
cd frontend
pgrep -fl "next dev" || true
# stop it if running (kill <pid>)
rm -rf .next
nvm use 18.17.0
npm run build
```

### Next.js Node version error

If you see a message like “Node.js version >= v18.17.0 is required”, switch Node:

```zsh
cd frontend
nvm use 18.17.0
```

### Backend not reachable

- Ensure the backend is running on `http://localhost:4000`.
- The frontend currently calls the backend via a hard-coded URL (`http://localhost:4000/vehicle`).

## Scripts

**Backend (`backend/package.json`)**
- `npm run dev` — start Express API

**Frontend (`frontend/package.json`)**
- `npm run dev` — start Next dev server
- `npm run build` — production build
- `npm run start` — run production server
