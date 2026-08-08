# AI Business Assistant — Demo

A portfolio demo showing how an AI chatbot can answer customer questions,
capture leads, and book appointments for a small business — built with
Next.js, TypeScript, and zero paid APIs.

## Run it locally

```bash
npm install
npm run dev
```

Then open http://localhost:3000

Pages:
- `/` — landing page + live chat demo
- `/dashboard` — leads, stats, conversations
- `/appointments` — mock booking flow
- `/settings` — mock business configuration

## How each feature works

**Chat widget** (`components/chat/ChatWidget.tsx`)
Keeps conversation state in React (`useState`), sends each message to
`lib/mock-ai-engine.ts`, and renders the reply after a short simulated
delay so it feels like a real network call.

**Mock AI engine** (`lib/mock-ai-engine.ts`)
Uses keyword matching to detect an "intent" (pricing, services, booking,
etc.) and returns a canned but relevant response built from
`lib/business-data.ts`. It's a single function — `getAIResponse()` — so
it's a drop-in target for a real API later.

**Lead capture**
When the mock AI detects buying intent (`lead_intent`, `appointment`, or
`human_handoff`), the chat widget shows an inline form. On submit, the
lead is saved via `lib/storage.ts` and immediately visible on `/dashboard`.

**Storage** (`lib/storage.ts`)
Everything is saved to `localStorage` right now. This is the only file
that touches storage directly — swapping to a real database later means
rewriting the functions in this file only.

**Dashboard** (`app/dashboard/page.tsx`)
Reads leads/appointments from storage and displays stats + a table, with
a proper empty state when there's no data yet.

## Where a real AI API connects later

`app/api/chat/route.ts` is a placeholder server route. Right now it just
calls the same mock engine, but it's already structured as a POST
endpoint that runs on the server (not the browser) — which is exactly
where you'd add a real API key safely:

1. Add `AI_API_KEY=your_key_here` to a `.env.local` file (never commit this).
2. Inside `route.ts`, replace the mock call with a real `fetch()` to your
   AI provider, using `process.env.AI_API_KEY`.
3. Update `ChatWidget.tsx` to call `fetch("/api/chat", ...)` instead of
   calling `getAIResponse()` directly in the browser.

Because the mock engine and the API route already share the same input/output
shape (`{ message, history } → { text, quickReplies, ... }`), this swap
doesn't require touching any UI component.

## Turning this into a real client product

- Replace `lib/business-data.ts` with the client's real services, pricing,
  hours and FAQs (or load it from a CMS/database).
- Swap `lib/storage.ts` for a real database (Postgres, Supabase, etc.) and
  a couple of API routes for reading/writing leads.
- Connect the AI route to a real model and feed it the business data as
  context (system prompt) instead of relying on keyword rules.
- Add authentication to `/dashboard` and `/settings` so only the business
  owner can view them.
- Wire the appointment form to a real calendar (Google Calendar, Cal.com, etc.).

## Tech notes

- No CSS framework — plain CSS Modules + a shared token system in
  `app/globals.css`, keeping dependencies minimal.
- No external state library — React's built-in `useState`/`useEffect` is
  enough at this scale.
- `prefers-reduced-motion` is respected globally; all interactive elements
  have visible focus states.
