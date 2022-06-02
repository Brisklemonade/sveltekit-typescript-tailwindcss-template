<script>
	import { supabase } from "./supabaseClient";
	import { user } from "./sessionStore";

	let loading = true;
	let current_balance, amount_at_risk, available_ballance, twitter_link;
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
				current_balance,
				amount_at_risk,
				available_ballance,
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
				.select(`current_balance, amount_at_risk, available_ballance, twitter_link`)
				.eq("id", user.id)
				.single();

			if (error && status !== 406) throw error;

			if (data) {
				current_balance = data.current_balance;
				amount_at_risk = data.amount_at_risk;
				available_ballance = data.available_ballance;
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
					<button class="mt-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" on:click={signOut} disabled={loading}>
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
					<label for="current_balance">Current Balance</label>
					<input
						id="current_balance" class="form-control" type="text"
						bind:value={current_balance}
					/>
				</div>
				<div class="form-group">
					<label for="amount_at_risk">Amount at risk</label>
					<input
						id="amount_at_risk" type="text" class="form-control"
						bind:value={amount_at_risk}
					/>
				</div>
				<div class="form-group">
					<label for="available_ballance">Available Ballance</label>
					<textarea id="available_ballance" class="form-control" bind:value={available_ballance} />
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