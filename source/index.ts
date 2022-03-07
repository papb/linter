function getPrettierBaseConfig() {
	return {
		singleQuote: true,
		semi: true,
		arrowParens: 'avoid',
		trailingComma: 'all',
		bracketSpacing: true,
		printWidth: 150,
		useTabs: true,
		quoteProps: 'consistent',
		proseWrap: 'never',
	} as const;
}

function getPrettierMarkdownAndVirtualMarkdownSubfilesConfig() {
	return {
		...getPrettierBaseConfig(),
		useTabs: false,
		tabWidth: 4,
	} as const;
}

export function prettierrc() {
	return {
		...getPrettierBaseConfig(),
		overrides: [
			{
				files: ['**/*.md', '**/*.md/*.{js,ts}'],
				options: getPrettierMarkdownAndVirtualMarkdownSubfilesConfig(),
			},
		],
	} as const;
}



function getEslintBasePrettierRules() {
	return {
		'prettier/prettier': ['warn', getPrettierBaseConfig()],

		// Avoid other rules conflicting with prettier
		'indent': 'off',
		'comma-dangle': 'off',
		'object-curly-spacing': 'off',
		'operator-linebreak': 'off',
		'no-mixed-spaces-and-tabs': 'off',
		'linebreak-style': 'off',
		'quote-props': ['error', 'consistent-as-needed'],
		'generator-star-spacing': 'off',
	} as const;
}

function getEslintMarkdownStuffPrettierRules() {
	return {
		...getEslintBasePrettierRules(),
		'prettier/prettier': ['warn', getPrettierMarkdownAndVirtualMarkdownSubfilesConfig()],
	} as const;
}

function getEslintBaseParserOptions() {
	return {
		ecmaVersion: 2019, // Node.js 12
		sourceType: 'module',
	} as const;
}

function getEslintBasePlugins() {
	return [
		'ava',
		// 'codegen', // TODO: eslint-plugin-codegen is not compatible with eslint-plugin-markdown, see https://github.com/mmkal/ts/issues/235
		'eslint-comments',
		'import',
		'markdown',
		'no-use-extend-native',
		'node',
		'prettier',
		'promise',
		'unicorn',
	] as const;
}

function getEslintBaseExtends() {
	return [
		'eslint:recommended',
		'plugin:unicorn/recommended',
		'plugin:ava/recommended',
		'xo',
		'plugin:markdown/recommended'
	] as const;
}

function getEslintBaseRules() {
	return {
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
		'no-use-extend-native/no-use-extend-native': 'error',
		'promise/param-names': 'error',
		'promise/no-return-wrap': ['error', { allowReject: true }],
		'promise/no-new-statics': 'error',
		'promise/no-return-in-finally': 'error',
		'promise/valid-params': 'error',
		'promise/prefer-await-to-then': 'error',
		'import/default': 'error',
		'import/export': 'error',
		'import/no-absolute-path': 'error',
		'import/no-anonymous-default-export': 'error',
		'import/no-named-default': 'error',
		'import/no-webpack-loader-syntax': 'error',
		'import/no-self-import': 'error',
		'import/no-useless-path-segments': 'error',
		'import/no-amd': 'error',
		'import/no-duplicates': 'error',
		'import/no-extraneous-dependencies': 'error',
		'import/no-mutable-exports': 'error',
		'import/no-named-as-default-member': 'error',
		'import/no-named-as-default': 'error',
		'import/no-unresolved': 'error',
		'node/no-unpublished-bin': 'error',
		'node/no-new-require': 'error',
		'node/no-path-concat': 'error',
		'node/no-deprecated-api': 'error',
		'node/prefer-global/buffer': ['error', 'always'],
		'node/prefer-global/console': ['error', 'always'],
		'node/prefer-global/process': ['error', 'always'],
		'node/prefer-global/text-decoder': ['error', 'always'],
		'node/prefer-global/text-encoder': ['error', 'always'],
		'node/prefer-global/url-search-params': ['error', 'always'],
		'node/prefer-global/url': ['error', 'always'],
		'node/prefer-promises/dns': 'error',
		'node/prefer-promises/fs': 'error',
		'eslint-comments/disable-enable-pair': ['error', { allowWholeFile: true }],
		'eslint-comments/no-aggregating-enable': 'error',
		'eslint-comments/no-duplicate-disable': 'error',
		'eslint-comments/no-unused-disable': 'error',
		'eslint-comments/no-unused-enable': 'error',

		// Warnings
		// 'codegen/codegen': 'warn',
		'no-warning-comments': 'warn',
		'unicorn/expiring-todo-comments': 'warn',

		// Disagreeing with some recommended configs from plugins
		'no-await-in-loop': 'off',
		'unicorn/better-regex': 'off', // Broken, see eslint-plugin-unicorn #895, #1231, #1626
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
		'unicorn/prefer-number-properties': ['error', { checkInfinity: false }],
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
	} as const;
}

function getEslintExtraTsExtends() {
	return [
		'plugin:@typescript-eslint/eslint-recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:import/typescript',
		'xo-typescript',
	] as const;
}

function getEslintExtraTsRules() {
	return {
		/// 'object-curly-spacing': 'off',
		'@typescript-eslint/indent': 'off',
		'@typescript-eslint/object-curly-spacing': ['error', 'always'],
		'@typescript-eslint/quotes': 'off',
		'@typescript-eslint/semi': 'off',

		'@typescript-eslint/prefer-function-type': 'error',
		'@typescript-eslint/restrict-template-expressions': 'error',
		'@typescript-eslint/no-shadow': 'error',

		'@typescript-eslint/padding-line-between-statements': 'off',

		'@typescript-eslint/consistent-indexed-object-style': 'off',
		'@typescript-eslint/explicit-function-return-type': 'off',
		'@typescript-eslint/no-non-null-assertion': 'off',
		'@typescript-eslint/no-require-imports': 'off',
		'@typescript-eslint/no-unsafe-return': 'off',

		'@typescript-eslint/comma-dangle': 'off',
		'@typescript-eslint/no-explicit-any': 'off',

		'@typescript-eslint/naming-convention': [
			'error',
			{
				selector: 'default',
				format: ['camelCase', 'UPPER_CASE'],
				leadingUnderscore: 'allow',
				trailingUnderscore: 'allow',
			},
			{
				selector: 'typeLike',
				format: ['PascalCase', 'UPPER_CASE'],
				leadingUnderscore: 'allow',
				trailingUnderscore: 'allow',
			},
		],

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
	} as const;
}

export type EslintrcOptions = {
	rules?: Record<string, unknown>;
	tsOnlyRules?: Record<string, unknown>;
	ignorePatterns?: string[];
};

export function eslintrc(options?: EslintrcOptions) {
	const baseRules = {
		...getEslintBaseRules(),
		...options?.rules
	};

	const extraTsRules = {
		...getEslintExtraTsRules(),
		...options?.tsOnlyRules
	};

	const ignorePatterns = ['node_modules'];

	if (options?.ignorePatterns) {
		ignorePatterns.push(...options.ignorePatterns);
	}

	return {
		parser: '@typescript-eslint/parser',
		parserOptions: {
			...getEslintBaseParserOptions(),
			extraFileExtensions: ['.md', '.cjs', '.mjs'],
		},
		plugins: getEslintBasePlugins(),
		extends: getEslintBaseExtends(),
		ignorePatterns,
		rules: { ...baseRules, ...getEslintMarkdownStuffPrettierRules() },
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
				rules: getEslintBasePrettierRules(),
			},
			{
				files: ['**/*.ts'],
				excludedFiles: ['**/*.md/*.ts'],
				parserOptions: {
					...getEslintBaseParserOptions(),
					project: ['./tsconfig.json'],
				},
				plugins: ['@typescript-eslint/eslint-plugin', ...getEslintBasePlugins()],
				extends: [...getEslintBaseExtends(), ...getEslintExtraTsExtends()],
				rules: { ...baseRules, ...extraTsRules, ...getEslintBasePrettierRules() },
			},
		],
	} as const;
}
