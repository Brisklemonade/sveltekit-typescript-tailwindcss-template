#!/usr/bin/env node

const { execSync } = require('child_process');

const runCommand = (command) => {
	try {
		execSync(`${command}`, { stdio: 'inherit' });
	} catch (err) {
		console.error(`Failed to execute ${command}`, err);
		return false;
	}
	return true;
};

const repoName = process.argv[2] ? process.argv[2] : 'tailwind-ts';

const gitCheckoutCommand = `git clone --depth 1 https://github.com/Brisklemonade/sveltekit-typescript-tailwindcss-template ${repoName}`;
const installDepsCommand = `cd ${repoName} && npm install`;

console.log(`Cloning the repository with name ${repoName}`);
const checkedOut = runCommand(gitCheckoutCommand);
if (!checkedOut) process.exit(-1);

console.log(`Installing dependencies for ${repoName}`);
const installedDeps = runCommand(installDepsCommand);
if (!installedDeps) process.exit(-1);

console.log('\nCongratulations your project is ready! Follow the steps below to start');
console.log(`1. cd ${repoName}`);
console.log(`2. npm run dev`);
