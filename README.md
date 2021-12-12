# Sveltekit Tailwind & Typescript Template

This is a starter template to jumpstart your project with Typescript and the latest version of [Tailwindcss](https://tailwindcss.com/), with minimal to no configuration needed.

## Installation

Run this command in your terminal:

```bash
	npx create-tailwindkit-ts@0.2.5 <app-name>
```

## Usage

If you want to enable dark mode you will have to modify the tailwind.config.cjs file

```javascript
module.exports = {
	mode: 'jit',
	purge: ['./src/**/*.svelte'],
	darkMode: 'class', // or 'media'
	theme: {
		extend: {}
	},
	variants: {
		extend: {}
	},
	plugins: []
};
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/)
