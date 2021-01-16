module.exports = {
	useTabs: true,
	tabWidth: 4,
	semi: false,
	singleQuote: true,
	bracketSpacing: false,
	overrides: [
		{
			files: '*.sol',
			options: {
				printWidth: 120,
				singleQuote: false,
				explicitTypes: 'always',
			},
		},
	],
}
