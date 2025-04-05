<script lang="ts">
	import "../app.css";
	import Header from "./Header.svelte";
</script>

<Header />
<main>
	<div class="container mx-auto p-5">
		<slot />
	</div>
</main>
