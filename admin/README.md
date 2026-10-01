# StepStyle - Separate Admin Panel

## Folders
- `frontend/` = customer website
- `admin/` = separate admin dashboard
- Backend stays in its own `backend/` folder/project.

## Run
1. Start backend on `http://localhost:5000`.
2. Serve `frontend/` with your normal Vite/frontend setup.
3. Serve `admin/` separately (or deploy it separately).
4. Open `admin/index.html` through a local web server, not `file://`, so API requests work reliably.

## Backend URL
Edit `admin/js/config.js` when the backend URL changes.

## Admin
The admin uses:
- POST `/api/admin/login`
- GET `/api/appointments`
- GET `/api/messages`
- PATCH `/api/appointments/:id/status`
- DELETE `/api/appointments/:id`
- DELETE `/api/appointments`
- DELETE `/api/messages/:id`
- DELETE `/api/messages`
- POST `/api/admin/logout`
