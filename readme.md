# @papb/linter

> My custom linter configs and dependencies collected in one place to avoid repetition.

## Why?

Until some time ago I was just using [XO](https://github.com/xojs/xo) in my repos and overwriting a few rule configurations manually. However, XO now requires the project to be ESM and I don't want to do that. I don't want to stay locked in an old XO version either.

## Install

```bash
# With npm
$ npm install --save-dev eslint@^8 prettier@^2 @papb/linter

# With yarn
$ yarn add --dev eslint@^8 prettier@^2 @papb/linter
```

## Usage

```js
// .eslintrc.cjs
module.exports = require('@papb/linter').eslintrc();

// .prettierrc.cjs
module.exports = require('@papb/linter').prettierrc();
```

```bash
# Will lint all `.js`, `.ts`, `.cjs` and `.md` files.
$ npx eslint . --max-warnings 0

# Will check all `.js`, `.ts`, `.cjs` and `.md` for prettier style.
$ npx prettier --check .

# Will overwrite in-place all `.js`, `.ts`, `.cjs` and `.md` for prettier style.
$ npx prettier --write .
```

**Note:** It is possible for ESLint to pass while `prettier --check` still fails, so you should run both.

Recommended npm scripts:

```json
{
    "scripts": {
        "lint": "eslint . --max-warnings 0 && prettier --check .",
        "prettier": "prettier --write .",
    }
}
```

## License

MIT © [Pedro Augusto de Paula Barbosa](https://github.com/papb)
