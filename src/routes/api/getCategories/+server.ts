// routes/api/getCategories/+server.ts
import { json } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { categories } from '$lib/server/db/schema';

export async function GET() {
    const result = await db.select().from(categories);
    return json(result);
}
