const prettier = {};

prettier.baseConfig = {
	singleQuote: true,
	semi: true,
	arrowParens: 'avoid',
	trailingComma: 'all',
	bracketSpacing: true,
	printWidth: 150,
	useTabs: true,
	quoteProps: 'consistent',
	proseWrap: 'never',
};

prettier.markdownAndVirtualMarkdownSubfilesConfig = {
	...prettier.baseConfig,
	useTabs: false,
	tabWidth: 4,
};

prettier.rc = {
	...prettier.baseConfig,
	overrides: [
		{
			files: ['**/*.md', '**/*.md/*.{js,ts}'],
			options: prettier.markdownAndVirtualMarkdownSubfilesConfig,
		},
	],
};

function prettierrc() {
	return { ...prettier.rc };
}



const eslint = {};

eslint.basePrettierRules = {
	'prettier/prettier': ['warn', prettier.baseConfig],

	// Avoid other rules conflicting with prettier
	'indent': 'off',
	'comma-dangle': 'off',
	'object-curly-spacing': 'off',
	'operator-linebreak': 'off',
	'no-mixed-spaces-and-tabs': 'off',
	'linebreak-style': 'off',
	'quote-props': ['error', 'consistent-as-needed'],
};

eslint.markdownStuffPrettierRules = {
	...eslint.basePrettierRules,
	'prettier/prettier': ['warn', prettier.markdownAndVirtualMarkdownSubfilesConfig],
};

eslint.baseParserOptions = {
	ecmaVersion: 2019, // Node.js 12
	sourceType: 'module',
};

// TODO: eslint-plugin-codegen is not compatible with eslint-plugin-markdown, see https://github.com/mmkal/ts/issues/235

// eslint.basePlugins = ['prettier', 'unicorn', 'ava', 'import', 'codegen', 'markdown'];
eslint.basePlugins = ['prettier', 'unicorn', 'ava', 'import', 'markdown'];

eslint.baseExtends = ['eslint:recommended', 'plugin:unicorn/recommended', 'plugin:ava/recommended', 'xo', 'plugin:markdown/recommended'];

eslint.baseRules = {
	// Styling rules (apart from prettier)
	'curly': 'off',
	'padding-line-between-statements': 'off',

	// Additional quality rules
	'no-var': 'error',
	'prefer-const': 'error',
	'strict': ['error', 'never'],
	'no-console': 'error',
	'prefer-arrow-callback': 'error',
	'unicorn/custom-error-definition': 'error',

	// Warnings
	// 'codegen/codegen': 'warn',
	'no-warning-comments': 'warn',
	'unicorn/expiring-todo-comments': 'warn',

	// Disagreeing with some recommended configs from plugins
	'no-await-in-loop': 'off',
	'unicorn/catch-error-name': 'off',
	'unicorn/consistent-function-scoping': 'off',
	'unicorn/no-array-for-each': 'off',
	'unicorn/no-await-expression-member': 'off',
	'unicorn/no-fn-reference-in-iterator': 'off',
	'unicorn/no-for-loop': 'off',
	'unicorn/no-null': 'off',
	'unicorn/no-useless-undefined': 'off',
	'unicorn/prefer-module': 'off',
	'unicorn/prefer-node-protocol': 'off',
	'unicorn/prefer-spread': 'off',
	'unicorn/prevent-abbreviations': 'off',

	/// 'unicorn/import-style': [
	/// 	'warn',
	/// 	{
	/// 		styles: {
	/// 			path: { default: false, namespace: true },
	/// 		},
	/// 	},
	/// ],
};

eslint.extraTsExtends = [
	'plugin:@typescript-eslint/eslint-recommended',
	'plugin:@typescript-eslint/recommended',
	'plugin:import/typescript',
	'xo-typescript',
];

eslint.extraTsRules = {
	/// 'object-curly-spacing': 'off',
	'@typescript-eslint/object-curly-spacing': ['error', 'always'],
	'@typescript-eslint/indent': 'off',
	'@typescript-eslint/quotes': 'off',
	'@typescript-eslint/semi': 'off',

	'@typescript-eslint/prefer-function-type': 'error',
	'@typescript-eslint/restrict-template-expressions': 'error',
	'@typescript-eslint/no-shadow': 'error',

	'@typescript-eslint/padding-line-between-statements': 'off',

	'@typescript-eslint/explicit-function-return-type': 'off',
	'@typescript-eslint/no-non-null-assertion': 'off',
	'@typescript-eslint/consistent-indexed-object-style': 'off',
	'@typescript-eslint/no-require-imports': 'off',
	'@typescript-eslint/no-unsafe-return': 'off',

	'@typescript-eslint/comma-dangle': 'off',
	'@typescript-eslint/no-explicit-any': 'off',

	/// 'no-unused-vars': 'off',
	/// '@typescript-eslint/no-unused-vars': [
	/// 	'error',
	/// 	{
	/// 		varsIgnorePattern: '^_',
	/// 		argsIgnorePattern: '^_',
	/// 		caughtErrorsIgnorePattern: '^_',
	/// 		ignoreRestSiblings: true,
	/// 		args: 'after-used',
	/// 	},
	/// ],
};

eslint.rc = {
	parser: '@typescript-eslint/parser',
	parserOptions: {
		...eslint.baseParserOptions,
		extraFileExtensions: ['.md', '.cjs', '.mjs'],
	},
	plugins: eslint.basePlugins,
	extends: eslint.baseExtends,
	ignorePatterns: ['node_modules'],
	rules: { ...eslint.baseRules, ...eslint.markdownStuffPrettierRules },
	overrides: [
		{
			files: ['**/*.md'],
			processor: 'markdown/markdown',
			rules: {
				'no-trailing-spaces': 'off',
				'no-multiple-empty-lines': 'off',
				'unicorn/filename-case': 'off',
			},
		},
		{
			files: ['**/*.md/*.{js,ts}'],
			rules: {
				'no-console': 'off',
				'import/no-unresolved': 'off',
			},
		},
		{
			files: ['**/*.{js,ts,cjs,mjs}'],
			excludedFiles: ['**/*.md/*.{js,ts}'],
			rules: eslint.basePrettierRules,
		},
		{
			files: ['**/*.ts'],
			excludedFiles: ['**/*.md/*.ts'],
			parserOptions: {
				...eslint.baseParserOptions,
				project: ['./tsconfig.json'],
			},
			plugins: ['@typescript-eslint/eslint-plugin', ...eslint.basePlugins],
			extends: [...eslint.baseExtends, ...eslint.extraTsExtends],
			rules: { ...eslint.baseRules, ...eslint.extraTsRules },
		},
	],
};

function eslintrc() {
	return { ...eslint.rc };
}



module.exports = { prettierrc, eslintrc };
