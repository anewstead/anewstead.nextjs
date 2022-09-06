# About this workspace

## Code

- nextjs, react (hooks), Progressive Web App ready
- Apollo, graphQL
- materialUI
- @emotion with tss-react
- classes in 'pages' folder are for routing and SSR only, actual page is in 'page'

## IDE/Editor

- VSCode was used to create so is preferd.
- Important; see /.vscode/README.md

## npm/packages

- Dependencies: production code
- DevDependencies: dev environment e.g. compiler, linting

## git:

- filesnames are case sensitve

## git hooks (husky):

- pre-commit: lint and prettier all src code
- post-merge: prompt to run npm install if packages-lock.json has changed

## prettier:

- default config, why mess with their years of working out what works

## eslint:

- almost default
- minimal rules added to reinforce prettier and react
- enforce folder/file name conventions

## stylelint:

- almost default
- minimal rules added to reinforce prettier, allow @rules and css-in-js/styled components

## typescript

- jsxImportSource: @emotion for extra default class attributes
