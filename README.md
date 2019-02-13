# Front Lane Utilities

A javascript utility library for UI front lane applications.

## Install
```bash
npm i front-lane-util
```

```bash
import { module } from 'front-lane-util'
```

## Build
FLU uses Rollup to bundle the utilities for consuming into other applications.
There are 3 build commands to use. Development is best to use the watch build.
Production builds uglify the code.

```bash
npm build
```

```bash
npm build:watch
```

```bash
npm build:prod
```

## Local Development
To run locally you will want to `npm link` the package.

NOTE: If you link then unlink a package you must run your install command again.

```bash
* Inside Front Lane Utilities
npm link
```

```bash
* Inside Application
npm link front-lane-util
```

## Testing
Testing uses Jest and 100% coverage is required.
