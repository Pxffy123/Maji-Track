# Maji-Track Frontend

React + Vite single-page app.

```bash
cp .env.example .env   # set VITE_API_BASE_URL to your backend
npm install
npm run dev
```

All API calls and the login token live in `src/services/api.js`.
The token is stored in `localStorage` under `access_token`.

## Deploying
Set `VITE_API_BASE_URL` in your host's environment settings (Netlify, etc.) to your
Railway backend URL ending in `/api`, then redeploy. On the backend, set
`CORS_ORIGINS` to your frontend's URL, otherwise the browser blocks every request.
