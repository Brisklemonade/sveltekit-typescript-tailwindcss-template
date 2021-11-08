# Sveltekit Tailwind & Typescript Template

This is a starter template to jumpstart your project with typescript and the latest version of [tailwindcss](https://tailwindcss.com/), with minimal to no configuration needed.

## Installation

You will need to git clone the repo:

```bash
git clone https://github.com/Brisklemonade/sveltekit-typescript-tailwindcss-template.git
```

then cd into the repo:

```bash
cd sveltekit-typescript-tailwindcss-template
```

and finally install the dependencies through npm:

```bash
npm i
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
