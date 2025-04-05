import { json } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { bookmarks } from '$lib/server/db/schema';

export async function POST({ request }) {
    const body = await request.json();

    const { title, url, description, categoryId } = body;

    if (!title || !url || !categoryId) {
        return json({ error: 'Missing required fields' }, { status: 400 });
    }

    await db.insert(bookmarks).values({
        title,
        url,
        description: description || '',
        categoryId: Number(categoryId)
    });

    return json({ success: true });
}
