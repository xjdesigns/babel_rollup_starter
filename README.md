# Babel Rollup Starter

This is a starter kit library for using Babel, Rollup, and Typescript.
Jest testing included.

### Things I learned from this process.
Setting up a project for typescript has additional steps to account for. I got hung up on
forgetting to always include `.ts` files to steps. Rollup node resolve was one of them,
as this handles your imports and needs to know we can allow importing typescript files.

## Install
```bash
npm i babel_rollup_starter
```

```bash
import { module } from 'babel_rollup_starter'
```

## Build
Typescript compiler for type declarations. Rollup and babel used for bundling.

Build an output file and type declarations
```bash
npm run build
```

Run types and bunding in watch mode
```bash
npm run build:watch
```

Run only types
```bash
npm run build:types
```

Run type checking
```bash
npm run type-check
```

## Local Development
To run locally you will want to `npm link` the package.

NOTE: If you link then unlink a package you must run your install command again.

```bash
* Inside babel_rollup_starter
npm link
```

```bash
* Inside Application
npm link babel_rollup_starter
```

## Testing
Testing uses Jest and 100% coverage is required.

Run tests in watch mode
```bash
npm run test
```

Run tests coverage report
```bash
npm run test:coverage
```
