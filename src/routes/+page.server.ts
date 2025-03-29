import { db } from "$lib/server/db"; // Adjust this path to where your DB is initialized
import { user } from "$lib/server/db/schema"; // Adjust schema path
import { eq } from "drizzle-orm";

export async function load() {
    const allUsers = await db.select().from(user);
    return { users: allUsers };
}