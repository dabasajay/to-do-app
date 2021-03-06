## To-Do-App

[![Ajay Dabas](https://img.shields.io/badge/Ajay-Dabas-825ee4.svg)](https://dabasajay.github.io)

A basic To-Do app built using React with TypeScript. Visit [https://dabasajay.github.io/to-do-app](https://dabasajay.github.io/to-do-app) to access the application.

<p align="center">
  <strong>Application State Data Flow Diagram</strong>
</p>

<p align="center">
  <img src="https://github.com/dabasajay/to-do-app/raw/source/app-state-data-flow.png" width="85%" alt="Application State Data Flow Diagram">
</p>

## Table of Contents

1. [Instructions to run the application](#1-instructions-to-run-the-application)
2. [Features](#2-features)
3. [Tools and technologies involved](#3-tools-and-technologies-involved)
4. [References](#4-references)

## 1. Instructions to run the application

1.  Clone this repository
2.  **`npm install`**<br>
    Install all the dependencies listed in `package.json`
3.  **`npm start`**<br>
    Runs the webpack development server. It can be found at `localhost:3000`.
4.  **`npm run testAll`**<br>
    Run all the tests using jest with enzyme.
5.  **`npm run build`**<br>
    Generate a production build of the application.

## 2. Features

- View / Add / Edit / Remove a to-do.
- Mark / Unmark a to-do as complete.
- To-dos are stored in local storage of browser so that one can access them even after browser refresh/restart.
- If data is not found in local storage, first 3 to-dos are fetched from Chuck Norris Jokes API. I hope you'll enjoy them ;)

## 3. Tools and technologies involved

- HTML, CSS, FontAwesome
- ReactJS, Reach Hooks
- TypeScript, Javascript
- Unstated-next for state management
- Jest with Enzyme for testing

## 4. References

- [React Docs](https://reactjs.org/docs/hooks-intro.html)
- [Unstated-next Guide](https://github.com/jamiebuilds/unstated-next#guide)
- [TypeScript and React by Stefan Baumgartner](https://fettblog.eu/typescript-react/)
- [Jest Docs](https://jestjs.io/docs/en/expect)
- [Enzyme Docs](https://enzymejs.github.io/enzyme/docs/api/)