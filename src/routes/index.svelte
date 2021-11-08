<script lang="ts">
	let subtitle: string = 'Helpful Links';
</script>

<div class="grid place-content-center m-20 p-20 border-2 border-blue-400 rounded-lg shadow-xl">
	<h1 class="text-4xl mb-4">
		<span class="text-[#FF3E00]">Sveltekit</span>
		with
		<span class="text-[#3178c6]">Typescript</span>
		&
		<span class="text-[#06B6D4]">Tailwind CSS</span>
	</h1>
	<h2 class="text-center text-3xl uppercase">{subtitle}</h2>
	<hr />
	<div class="mt-4 w-full">
		<a href="https://kit.svelte.dev/" target="_blank">
			<div
				class="my-5 text-center font-semibold text-xl shadow-md rounded-xl p-4 border-2 border-blue-400 w-full hover:bg-blue-400 hover:text-white transition-colors duration-200 ease-linear"
			>
				SvelteKit Docs
			</div>
		</a>
		<a href="https://www.typescriptlang.org/docs/" target="_blank">
			<div
				class="my-5 text-center font-semibold text-xl shadow-md rounded-xl p-4 border-2 border-blue-400 w-full hover:bg-blue-400 hover:text-white transition-colors duration-200 ease-linear"
			>
				Typescript Docs
			</div>
		</a>
		<a href="https://tailwindcss.com/" target="_blank">
			<div
				class="my-5 text-center font-semibold text-xl shadow-md rounded-xl p-4 border-2 border-blue-400 w-full hover:bg-blue-400 hover:text-white transition-colors duration-200 ease-linear"
			>
				Tailwind Docs
			</div>
		</a>
	</div>
</div>
