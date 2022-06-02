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
				.select(`current_balance, amount_at_risk, available_ballance`)
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
						id="email" class="form-control bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" value={$user.email} disabled
					/>
				</div>
				<div class="form-group">
					<label for="current_balance">Current Balance</label>
					<input
						id="current_balance" class="form-control bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text"
						bind:value={current_balance}
					/>
				</div>
				<div class="form-group">
					<label for="amount_at_risk">Amount at risk</label>
					<input
						id="amount_at_risk" type="text" class="form-control bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
						bind:value={amount_at_risk}
					/>
				</div>
				<div class="form-group">
					<label for="available_ballance">Available Ballance</label>
					<textarea id="available_ballance" class="form-control bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" bind:value={available_ballance} />
				</div>
				<div class="form-group">
					<label for="twiiter_link">Twitter link</label>
					<input
						id="twiiter_link" type="text" class="form-control bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
						bind:value={twitter_link}
					/>
				</div>

				<div>
					<input type="submit" class="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:focus:ring-yellow-900" value={loading ? "Loading ..." : "Update"}
						disabled={loading}
					/>
				</div>
			</form>
			{#if message.success != null}
				<div class="alert {message.success ? 'p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg dark:bg-green-200 dark:text-green-800' : 'p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800'}" role="alert">
					{message.display}
				</div>
			{/if}
		</div>
	</div>
</div>