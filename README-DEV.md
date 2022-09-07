# About this workspace

## Code

- nextjs, react (hooks), Progressive Web App ready
- Apollo, graphQL, Redux
- materialUI
- @emotion with tss-react

## Structure

- the 'pages' folder is reserved by nextjs, so:
- classes in 'pages' are for routes and SSR code only, actual page content is located in 'page' folder

## IDE/Editor

- VSCode was used to create so is preferd.
- Important; see /.vscode/README.md

## npm/packages

- Dependencies: production code
- DevDependencies: dev environment e.g. compiler, linting

## git:

- filenames are case sensitve

## git hooks (husky):

- pre-commit: lint and prettier all src code
- post-merge: prompt to run npm install if packages-lock.json has changed

## prettier:

- default config, why mess with their years of working out what works

## eslint:

- extends airbnb (extensive and well regarded)
- minimal rules added to reinforce prettier and react
- enforce folder/file name conventions

## stylelint:

- almost default
- minimal rules added to reinforce prettier, allow @rules and css-in-js/styled components

## typescript

- jsxImportSource: @emotion for extra default class attributes
