import { json } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { bookmarks, categories } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

export async function GET() {
    // Fetch categories with bookmarks
    const categoriesWithBookmarks = await db
        .select()
        .from(categories)
        .leftJoin(bookmarks, eq(bookmarks.categoryId, categories.id))
        .execute();

    // Group bookmarks by category
    const groupedCategories = categoriesWithBookmarks.reduce((acc, item) => {
        // Find or create the category entry in the accumulator
        const category = acc.find((cat) => cat.id === item.categories.id);
        if (!category) {
            acc.push({
                id: item.categories.id,
                name: item.categories.name,
                bookmarks: [item.bookmarks],
            });
        } else {
            // Add bookmark to the existing category
            category.bookmarks.push(item.bookmarks);
        }
        return acc;
    }, []);

    // Return the grouped categories with bookmarks
    return json(groupedCategories);
}