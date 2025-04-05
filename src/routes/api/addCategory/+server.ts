// routes/api/addCategory/+server.ts
import { json } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { categories } from '$lib/server/db/schema';

export async function POST({ request }) {
    const { name } = await request.json();

    if (!name) {
        return json({ error: 'Category name is required' }, { status: 400 });
    }

    await db.insert(categories).values({ name });

    return json({ success: true });
}
