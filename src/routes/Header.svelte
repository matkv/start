<script lang="ts">
    import { page } from "$app/state";

    import { _exportPageAsHTML } from "./api/export/+server";
</script>

<nav class=" bg-white border-gray-200 dark:bg-gray-900">
    <div
        class="container mx-auto p-5 flex flex-wrap items-center justify-between"
    >
        <span class="self-center text-2xl font-semibold whitespace-nowrap"
            ><a href="/">Bookmarks</a></span
        >
        <div class="w-full md:w-auto">
            <ul class="flex space-x-4">
                <li
                    aria-current={page.url.pathname === "/export"
                        ? "page"
                        : undefined}
                >
                    <a href="#" on:click={_exportPageAsHTML}><b>Export</b></a>
                </li>
                <li
                    aria-current={page.url.pathname === "/config"
                        ? "page"
                        : undefined}
                >
                    <a href="/config"><b>Config</b></a>
                </li>
            </ul>
        </div>
    </div>
</nav>
