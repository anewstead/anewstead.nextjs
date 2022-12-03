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

"pages" & "layout" folders  
In Nextjs routes (URLs) are defined by the contents of the resevered folder 'src/pages'.  
In a non-NextJs App i.e. React with Router, we may as well retain this folder for routing too. 
It can help make things easier if we ever need to swap from one to the other,  
but more importantly we clearly separate concerns of routing from layout.  

In a nextJs 'src/pages' along with routing also handle SSR related logic, 
these 'pages' instansiate namesake 'layout' passing through SSR data.  
E.G. mysite.com/about = src/pages/about (SSR data) > instantiates src/layout/about  

In a non-nextJS app we should follow:  
E.G. pages/routes.js > instansiates layout/(home, about etc)  

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
