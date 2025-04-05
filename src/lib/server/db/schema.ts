import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const user = sqliteTable('user', {
	id: integer('id').primaryKey(),
	age: integer('age')
});

export const categories = sqliteTable("categories", {
	id: integer("id").primaryKey({ autoIncrement: true }),
	name: text("name").notNull().unique(),
});

export const bookmarks = sqliteTable("bookmarks", {
	id: integer("id").primaryKey({ autoIncrement: true }),
	title: text("title").notNull(),
	url: text("url").notNull(),
	description: text("description"),
	categoryId: integer("category_id")
		.references(() => categories.id)
		.notNull(),
});