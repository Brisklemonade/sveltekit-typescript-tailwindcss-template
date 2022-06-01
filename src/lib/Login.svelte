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
		<h1 class="header">Eternal Dev Community</h1>
		<p class="description">Enter your email below to get a link to login</p>
		<div class="form-group">
			<label for="email">Email Address</label>
			<input
				id='email' class="form-control" type="email" placeholder="Your email"
				bind:value={email}
			/>
		</div>
		<div class="form-group">
			<label for="password">Password</label>
			<input
				id='password' class="form-control" type="password" placeholder="Set your new password"
				bind:value={password}
			/>
		</div>
		<div>
			<input type="submit" class="btn btn-success" value={loading ? "Loading" : "Log in"}
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