<script lang="ts">
    import { onMount } from "svelte";

    let title = "";
    let url = "";
    let description = "";
    let categoryId = "";
    let newCategoryName = "";

    let bookmarks = [];
    let categories = [];

    const fetchBookmarks = async () => {
        const res = await fetch("/api/getBookmarks");
        bookmarks = await res.json();
    };

    const fetchCategories = async () => {
        const res = await fetch("/api/getCategories");
        categories = await res.json();
    };

    const addCategory = async () => {
        const res = await fetch("/api/addCategory", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: newCategoryName }),
        });

        if (res.ok) {
            newCategoryName = "";
            await fetchCategories();
        } else {
            const err = await res.json();
            alert(err.error || "Failed to add category");
        }
    };

    const submitBookmark = async () => {
        const res = await fetch("/api/addBookmark", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                title,
                url,
                description,
                categoryId: Number(categoryId),
            }),
        });

        if (res.ok) {
            title = url = description = categoryId = "";
            await fetchBookmarks();
        } else {
            const err = await res.json();
            alert(err.error || "Something went wrong");
        }
    };

    onMount(() => {
        fetchBookmarks();
        fetchCategories();
    });
</script>

<h2>Add Category</h2>
<form on:submit|preventDefault={addCategory}>
    <input bind:value={newCategoryName} placeholder="Category name" required />
    <button type="submit">Add Category</button>
</form>

<h1>Categories</h1>
<ul>
    {#each categories as cat}
        <li>
            <strong>{cat.name}</strong>
        </li>
    {/each}
</ul>

<hr />

<h2>Add Bookmark</h2>
<form on:submit|preventDefault={submitBookmark}>
    <input bind:value={title} placeholder="Title" required />
    <input bind:value={url} placeholder="URL" required />
    <textarea bind:value={description} placeholder="Description" />

    <select bind:value={categoryId} required>
        <option value="" disabled selected>Select a category</option>
        {#each categories as c}
            <option value={c.id}>{c.name}</option>
        {/each}
    </select>

    <button type="submit">Add Bookmark</button>
</form>

<hr />

<h2>Bookmarks</h2>
<ul>
    {#each bookmarks as bm}
        <li>
            <strong>{bm.title}</strong> —
            <a href={bm.url} target="_blank">{bm.url}</a><br />
            <em>{bm.description}</em><br />
            <span>Category: {bm.category}</span>
        </li>
    {/each}
</ul>
