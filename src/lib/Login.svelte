<script>
	import { supabase } from "./supabaseClient";

	let loading = false;
	let email, password;
	let message = { success: null, display: "" };

	const handleLogin = async () => {
		try {
			loading = true;
			const { error } = await supabase.auth.signIn({ email, password });
			if (error) throw error;
			message = { success: true, display: "Successfully logged in!" };
		} catch (error) {
			let errorMsg = error.error_description || error.message;
			message = { success: false, display: errorMsg };
		} finally {
			loading = false;
		}
	};
</script>

<form on:submit|preventDefault={handleLogin}>
	<div class="form-widget">
		<h1 class="header">Login</h1>
		<p class="description">Enter The Blizzard of Odds</p>
		<div class="form-group bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
			<label for="email">Email Address</label>
			<input
				id='email' class="form-control" type="email" placeholder="Your email"
				bind:value={email}
			/>
		</div>
		<div class="form-group bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
			<label for="password">Password</label>
			<input
				id='password' class="form-control" type="password" placeholder="Set your new password"
				bind:value={password}
			/>
		</div>
		<div>
			<input type="submit" class="mt-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" value={loading ? "Loading" : "Log in"}
				disabled={loading}
			/>
		</div>
		{#if message.success != null}
			<div class="alert {message.success ? 'alert-success' : 'alert-danger'}" role="alert">
				{message.display}
			</div>
		{/if}
	</div>
</form>