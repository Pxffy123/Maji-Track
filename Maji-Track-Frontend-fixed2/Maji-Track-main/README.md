# Maji-Track 🌊
**Nairobi Water Access & Shortage Monitoring Platform**

Maji-Track is a web platform that tracks areas of Nairobi experiencing water shortages. The city is split into districts, residents submit shortage reports, and admins verify them.

## Key Features
* **Landing Page**: Critical water shortage banner, plus login and sign-up.
* **Districts & Severity Sorting**: Shortages are sorted from most to least critical (e.g. *Location: Umoja 1, Severity: Critical, Time-Without-Water: 3 weeks*).
* **Resident & Admin Dashboards**: Residents see district shortages and can submit reports; admins review pending reports and approve or reject them.

## Setup
1. Clone the repository: `git clone https://github.com/Pxffy123/Maji-Track.git`
2. `cd Maji-Track/MajiTrackFrontEnd`
3. `cp .env.example .env` and set `VITE_API_BASE_URL` to your backend (default `http://localhost:5555/api`)
4. `npm install && npm run dev`

See `docs/QA_CHECKLIST.md` for the frontend testing checklist and `docs/database_schema.md` for the database design.
