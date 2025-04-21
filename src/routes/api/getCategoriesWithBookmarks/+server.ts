import { json } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { bookmarks, categories } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

export async function GET() {
    const rows = await db
        .select()
        .from(categories)
        .leftJoin(bookmarks, eq(bookmarks.categoryId, categories.id));

    const grouped = new Map<
        number,
        { id: number; name: string; bookmarks: { title: string; url: string; description: string | null }[] }
    >();

    for (const row of rows) {
        const cat = row.categories;
        const bm = row.bookmarks;

        if (!grouped.has(cat.id)) {
            grouped.set(cat.id, {
                id: cat.id,
                name: cat.name,
                bookmarks: [],
            });
        }

        if (bm && bm.id) {
            grouped.get(cat.id)?.bookmarks.push({
                title: bm.title,
                url: bm.url,
                description: bm.description,
            });
        }
    }

    return json([...grouped.values()]);
}
