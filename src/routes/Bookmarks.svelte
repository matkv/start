<script lang="ts">
    import { onMount } from "svelte";

    let categoriesWithBookmarks = [];

    const fetchCategoriesWithBookmarks = async () => {
        const res = await fetch("/api/getCategoriesWithBookmarks");

        if (res.ok) {
            categoriesWithBookmarks = await res.json();
        } else {
            console.error("Failed to fetch categories and bookmarks");
        }
    };

    onMount(() => {
        fetchCategoriesWithBookmarks();
    });
</script>

{#if categoriesWithBookmarks.length > 0}
    {#each categoriesWithBookmarks as item}
        <section class="mb-8">
            <h2 class="text-2xl font-bold mb-4">{item.name}</h2>
            <div
                class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
            >
                {#each item.bookmarks as bookmark}
                    <a
                        href={bookmark.url}
                        class="block p-4 bg-gray-900 rounded-lg shadow hover:bg-gray-800"
                    >
                        <h3 class="text-lg font-semibold">{bookmark.title}</h3>
                        <p class="text-sm text-gray-300">
                            {bookmark.description}
                        </p>
                    </a>
                {/each}
            </div>
        </section>
    {/each}
{:else}
    <p>Loading categories...</p>
{/if}
