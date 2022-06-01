<script>
	import { supabase } from "./supabaseClient";
	import { user } from "./sessionStore";

	let loading = true;
	let username, display_name, bio, twitter_link;
	let message = { success: null, display: "" };

  async function signOut() {
		try {
			loading = true;
			let { error } = await supabase.auth.signOut();
			if (error) throw error;
		} catch (error) {
			message = { success: false, display: error.message };
		} finally {
			loading = false;
		}
	}

  async function updateProfile() {
		try {
			loading = true;
			const user = supabase.auth.user();

			const updates = {
				id: user.id,
				username,
				display_name,
				bio,
				twitter_link,
				updated_at: new Date(),
			};

			let { error } = await supabase.from("profiles").upsert(updates, {
				returning: "minimal",
			});

			if (error) throw error;
		} catch (error) {
			message = { success: false, display: error.message };
		} finally {
			loading = false;
		}
	}

	async function getProfile() {
		try {
			loading = true;
			const user = supabase.auth.user();

			let { data, error, status } = await supabase
				.from("profiles")
				.select(`username, display_name, bio, twitter_link`)
				.eq("id", user.id)
				.single();

			if (error && status !== 406) throw error;

			if (data) {
				username = data.username;
				display_name = data.display_name;
				bio = data.bio;
				twitter_link = data.twitter_link;
			}
		} catch (error) {
			message = { success: false, display: error.message };
		} finally {
			loading = false;
		}
	}
</script>

<div class="container">
	<div class="row flex flex-center">
		<div class="col-4 offset-4 mt-5">
			<div class="row heading">
				<span class="col-8">Profile</span>
				<div class="col-4">
					<button class="btn btn-secondary" on:click={signOut} disabled={loading}>
						Sign Out
					</button>
				</div>
			</div>
			<form use:getProfile class="form-widget" on:submit|preventDefault={updateProfile}>
				<div class="form-group">
					<label for="email">Email</label>
					<input
						id="email" class="form-control" type="text" value={$user.email} disabled
					/>
				</div>
				<div class="form-group">
					<label for="username">Username</label>
					<input
						id="username" class="form-control" type="text"
						bind:value={username}
					/>
				</div>
				<div class="form-group">
					<label for="display_name">Display Name</label>
					<input
						id="display_name" type="text" class="form-control"
						bind:value={display_name}
					/>
				</div>
				<div class="form-group">
					<label for="bio">Bio</label>
					<textarea id="bio" class="form-control" bind:value={bio} />
				</div>
				<div class="form-group">
					<label for="twiiter_link">Twitter link</label>
					<input
						id="twiiter_link" type="text" class="form-control"
						bind:value={twitter_link}
					/>
				</div>

				<div>
					<input type="submit" class="btn btn-primary" value={loading ? "Loading ..." : "Update"}
						disabled={loading}
					/>
				</div>
			</form>
			{#if message.success != null}
				<div class="alert {message.success ? 'alert-success' : 'alert-danger'}" role="alert">
					{message.display}
				</div>
			{/if}
		</div>
	</div>
</div>