Next.js CRM Exercise: Debounced Search

What this is
A tiny Next.js app with:
- An in-memory dataset of ~300 contacts
- An API route GET /api/contacts that filters by ?q= (name or email)
- A Contacts page that lists all contacts

Your task 
Add a debounced, server-side search to filter contacts.

Run it
- npm install
- npm run dev
- Open http://localhost:3000/contacts

Notes
- The API simulates ~350ms latency so you can show a loading state.
- For real apps, you’d paginate and validate query params.