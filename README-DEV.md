# About this workspace

## Code

- NextJS, React (hooks)
- Apollo, graphQL, Redux
- materialUI
- @emotion with tss-react
- Progressive Web App ready

## Structure

The 'pages' folder is reserved by nextjs for routes and only place to run SSR functions, so ensure we clearly separate concerns in the code:    
'pages' files define routes, handle SSR related code ONLY, instantiate namesake layout from 'page' folder passing through SSR data.  
E.G. src/pages/about (gets SSR data) > instantiates src/page/about (layout)  

## IDE/Editor

- VSCode was used to create so for simplicity is preferred. 
- Important; see /.vscode/README.md 

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
