<script lang="ts">
    import { page } from "$app/state";
</script>

<nav class=" bg-white border-gray-200 dark:bg-gray-900">
    <div
        class="container mx-auto p-5 flex flex-wrap items-center justify-between"
    >
        <span class="self-center text-2xl font-semibold whitespace-nowrap"
            ><a href="/">Bookmarks</a></span
        >
        <div class="w-full md:w-auto">
            <ul>
                <li
                    aria-current={page.url.pathname === "/config"
                        ? "page"
                        : undefined}
                >
                    <a href="/config">Config</a>
                </li>
            </ul>
        </div>
    </div>
</nav>
