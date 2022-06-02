<script lang="ts">
	let subtitle: string = 'Make Dymanic';
	import {user} from "$lib/sessionStore"
    import {supabase} from "$lib/supabaseClient"
    import Profile from "$lib/Profile.svelte"
	import Signup from "$lib/Signup.svelte"
	import Navbar from "$lib/Navbar.svelte";

    user.set(supabase.auth.user())

    supabase.auth.onAuthStateChange((_, session) => {
        user.set(session.user)
    })
</script>

<Navbar />
<div class="grid place-content-center m-20 p-20 border-2 border-blue-400 rounded-lg shadow-xl">
	<h1 class="text-4xl mb-4">
		<span class="text-[#FF3E00]">Bet</span>
		with
		<span class="text-[#3178c6]">Us</span>
		&
		<span class="text-[#06B6D4]">Win With Us</span>
	</h1>
	<div class="container" style="padding: 50px 0 100px 0;">
    {#if $user}
        <Profile />
    {:else}
		<Signup />
    {/if}
</div>
	<h2 class="text-center text-3xl uppercase">{subtitle}</h2>
	<hr />
	<div class="mt-4 w-full">
		<a href="https://3000-halftimehar-sveltekitty-8d3nmznwyem.ws-us46.gitpod.io/log_in" target="_blank">
			<div
				class="my-5 text-center font-semibold text-xl shadow-md rounded-xl p-4 border-2 border-blue-400 w-full hover:bg-blue-400 hover:text-white transition-colors duration-200 ease-linear"
			>
				Log In
			</div>
		</a>

		<a href="https://tailwindcss.com/" target="_blank">
			<div
				class="my-5 text-center font-semibold text-xl shadow-md rounded-xl p-4 border-2 border-blue-400 w-full hover:bg-blue-400 hover:text-white transition-colors duration-200 ease-linear"
			>
				Profile
			</div>
		</a>
	</div>
</div>
