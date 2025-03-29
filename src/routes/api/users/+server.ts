import { db } from "$lib/server/db";
import { user } from "$lib/server/db/schema";
import { desc } from "drizzle-orm";

export async function POST({ request }) {
    const { age } = await request.json();

    // Find the highest existing ID
    const lastUser = await db.select().from(user).orderBy(desc(user.id)).limit(1);
    const newId = lastUser.length ? lastUser[0].id + 1 : 1;

    await db.insert(user).values({ id: newId, age });

    return new Response(JSON.stringify({ message: "User added", id: newId }), {
        status: 201,
    });
}
