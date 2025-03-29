# start

Dynamically created startpage / bookmarks page. Practice project for trying out Svelte.

## Setup

Using sqlite for the DB this time. So it's not needed to run docker like in the previous example with a MySQL DB.

Settings I used during the setup:

- Template -> SvelteKit minimal
- TypeScript -> Yes
- Added eslint, tailwindcss, drizzle
- Added typography plugin for tailwindcss
- Drizzle -> SQLite
- SQLite client -> libSQL

## Running the app

Running the svelte app:

```bash
npm run dev
```

Accessing DB in CLI (in project root folder):

```bash
sqlite3 local.db

.tables # show all tables

SELECT * FROM user; # show all users (temp table for trying out for now)
```