# CRUD API Server App

## Description

A simple **CRUD API Server using Node.js** is an [assignment](https://github.com/AlreadyBored/nodejs-assignments/blob/main/assignments/crud-api/assignment.md) for the third week of RS School [Node.js Development Course](https://github.com/AlreadyBored/nodejs-assignments). Its goal is to implement a [CRUD](https://en.wikipedia.org/wiki/Create,_read,_update_and_delete) (create, read, update and delete) server that is capable of storing and manipulating user information using an in-memory database.

## Technical specs

The task was performed in pure `Node.js v16.15.0` using `http` module and minimal amount of external libraries as a learning exercise.

The following external **dependencies** were used:

- `dotenv` for parsing `.env` file;
- `uuid` for generating a Universal Unique Identifier.

The following **developer dependencies** were utilized:

- `nodemon` for automatic executing files on change;
- `typescript`, `ts-node`, `ts-loader` for typescript transpiling;
- `mocha`, `chai`, `chai-http` for testing;
- `@types/` for typescript type declarations.

## Installation

1. Clone [this repository](https://github.com/elquespera/nodejs-rss2022-crud-api) and checkout to dev branch:

```console
git clone https://github.com/elquespera/nodejs-rss2022-crud-api.git
cd ./nodejs-rss2022-crud-api
git checkout dev
```

2. Install dependencies:

```console
npm install
```

## Running and testing

The following scripts are available for building, running and testing the applicaiton:

- `npm start` for watching ts files with on-the-fly transpiling;
- `npm run start:prod` to transpile ts files and run `node index.js`;
- `npm run start:dev` for watching transpiled js files;
- `npm run start:multi` to watch the cluster version of the app;
- `npm test` to run all testing scenarios available;
- `npm run test1` to run all test scenario #1 [^1];
- `npm run test2` to run all test scenario #2 [^1];
- `npm run test3` to run all test scenario #3 [^1];


[^1]: Test scripts must be run alongside an open instance of the app.