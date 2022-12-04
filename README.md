# anewstead.nextjs

[https://anewstead-nextjs.vercel.app/](https://anewstead-nextjs.vercel.app/)

Portfolio web app:

1. Show some of the projects I have developed
2. Have some non-client code others can review

-----  
# About this workspace

## Code

- Typescript
- NextJS, React (hooks)
- Apollo, graphQL, Redux
- materialUI
- @emotion with tss-react
- Progressive Web App ready

## Structure
#### "pages" & "content" folders
In Nextjs the 'src/pages' folder is reserved to define routes and handle SSR related code.  
Separating concerns of actual content & layout from this keeps code much cleaner.  
So files in 'pages' instansiate namesake 'content' passing through SSR data.  
E.G. mysite.com/about = src/pages/about (SSR data) > instantiates src/content/about  

In a non-NextJs App (React with Router), we simply retain this folder setup.  
If nothing else it makes things easier if we ever need to repurpose from one to the other,   
E.G. pages/routes.js > instansiates content/(home, about etc)  

## IDE/Editor

- VSCode was used to setup 
- Important: see /.vscode/README.md 

## git:

- filenames are case sensitve and further enforced by eslint

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

- almost default, minimal rules added to reinforce prettier
- allow @rules and css-in-js/styled components

## typescript

- jsxImportSource: @emotion for extra default class attributes
