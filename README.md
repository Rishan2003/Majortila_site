# HEXA’S Majortila — editable website

## What is included
- Password-protected staff dashboard at `/#/dashboard` (also linked in the footer).
- Shared edits to admissions phone, office hours, all course fees and durations, course descriptions/features, weekly care schedules and practice-test details.
- Mock & partial registration page linked in desktop and mobile navigation. It prepares a copyable request; it does not collect submissions, take payment or reserve a seat.
- Prominent weekly schedules on all seven facility pages and an overview on the Student care page. Times are Bangladesh time (UTC+6).

No real club timetable or practice-test fees were supplied. These are left unannounced / contact admissions until staff enters confirmed details.

## One-time Vercel setup
1. Put this extracted project in your Git repository and import it into Vercel. Select Vite, build command `npm run build`, output directory `dist`, Node.js 24. Deploy the project root including `api/` and `shared/`, not just `dist/`.
2. In the Vercel Marketplace, connect an Upstash Redis database to the project. Use a separate database for preview/testing if you enable preview deployments.
3. Under project Environment Variables, add a unique `ADMIN_PASSWORD` of at least 16 characters. Keep it server-side: never prefix it with `VITE_`.
4. Ensure `KV_REST_API_URL` and `KV_REST_API_TOKEN` exist. The API also accepts `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN`. Use the read/write token. The Marketplace integration can add these automatically.
5. Redeploy so the environment settings take effect. Visit your domain's `/#/dashboard`, sign in, enter confirmed details, and choose **Publish changes**.
6. Verify a phone link, a course fee and a published care schedule in another browser before announcing the site.

References: https://vercel.com/docs/redis and https://upstash.com/docs/redis/howto/vercelintegration

Updates are stored in Redis under `hexas:site-content:v1`; they survive redeployments. New visitors load the saved values; already-open pages refresh every 60 seconds and on window focus. Back up/export the Redis data using your provider's tooling. Rotating ADMIN_PASSWORD invalidates signed sessions. Login expires after eight hours. The API limits login attempts and rejects stale saves to prevent silent overwrites.

## Daily editing
- **Contact:** updates the admissions number throughout the site and office hours on Contact.
- **Courses:** edit regular/discounted fees, duration, class count and time per class. Update any matching details in descriptions or features in the same form.
- **Club schedules:** enter weekly days, start/end time, room and notice, then select Published. Choose Temporarily paused for cancelled periods. One weekly time range is supported per facility; list the days sharing that time. Use the notice for exceptions.
- **Mock & partial:** edit fees and the available-date/time notice.

Only **Publish changes** saves edits. Switching dashboard sections keeps your draft; navigating away or reloading does not save it. If another administrator publishes first, the dashboard asks you to reload rather than overwrite their work.

## Local preview and development
`dist/OPEN-WEBSITE.html` is a double-click visual preview. Shared editing needs the API and Redis; it is not enabled by opening this file or hosting dist alone. The site shows original preview values if the content service cannot be reached, and schedule cards ask visitors to call for current times.

For frontend work:
```
npm ci
npm run dev
```
For the complete API locally, use Vercel CLI `vercel dev` with your project's development environment variables. Do not commit `.env` files or credentials.

```
npm run build
npm test
```

## Validation and limitations
Production build and automated API tests passed. Desktop and 390px mobile browser checks passed for publishing contact details, course pricing, care timetables, partial-test request preparation, mobile navigation and horizontal overflow; no runtime errors were detected. Browser checks used a simulated content API. API tests use a simulated Redis transport; a live Vercel/Upstash deployment has not been provisioned or tested. The updated website has not been deployed. Existing institutional claims and course facts come from the supplied archive.

The dashboard manages operational content, not page design. Registration remains a prepare-and-contact flow; add an approved booking/delivery service if you later want to accept and manage submissions.
