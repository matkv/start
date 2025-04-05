import { json } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { bookmarks, categories } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

export async function GET() {
    const result = await db
        .select({
            id: bookmarks.id,
            title: bookmarks.title,
            url: bookmarks.url,
            description: bookmarks.description,
            category: categories.name
        })
        .from(bookmarks)
        .leftJoin(categories, eq(bookmarks.categoryId, categories.id));

    return json(result);
}
