<script>
    export let data;
    let users = data.users; // Keep local copy of users
    let age = 20; // Default age for new users

    async function addUser() {
        const res = await fetch("/api/users", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ age }),
        });

        if (res.ok) {
            const newUser = await res.json();
            users = [...users, { id: newUser.id, age }]; // Update UI without reload
        }
    }
</script>

<h1>Users</h1>

<input type="number" bind:value={age} min="1" />
<button on:click={addUser}>Add User</button>

<ul>
    {#each users as user}
        <li>{user.id} - {user.age}</li>
    {/each}
</ul>
