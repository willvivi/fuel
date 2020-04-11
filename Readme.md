# Fuel Project

This project aims to provide a simple way to get detailed information about Gas Stations in France.
<https://www.fairedelessence.com>

## Project status

Straightforward API built on Node with TypeScript and Express.js / Mongoose.
Front built with TypeScript, React.JS.

## Instructions

### Local setup

- Install Docker
- Run `docker-compose build` from the root of the repository

### Running the project

- Run `docker-compose up` from the root of the repository

  OR (not recommended)

- Install node and start project using scripts in package.json. This is not recommended as it will keep you from having the same environment as production locally. Use this solution only if you encounter severe problems with Docker.

### Testing the project (tests are incomplete)

- Run `docker exec -it fuel_server_1 "bash"` in a new terminal (make sure the project is up before running this)
- Once logged onto the container, run `jest --watchAll`. The tests will run when the watcher detects file changes (TDD). To run the tests once, simply run `jest`.

### Updating dependencies

- Install your new dependency running `npm install` as usual, then run `docker-compose build` from the root of the repository. Before launching `docker-compose up`, make sure you downed all your containers first with `docker-compose down`.

### Production build

- Run `docker-compose -f docker-compose.prod.yml build`, then `docker-compose -f docker-compose.prod.yml up`

### Production build for ARM devices (eg. Raspberry Pi)

- Run `docker-compose -f docker-compose.arm.yml build`, then `docker-compose -f docker-compose.arm.yml up`

#### Build errors on Windows (outside Docker)

- If you run into MSBuild errors, launch a PowerShell as administrator and install `windows-build-tools` using this command: `npm install -g --production windows-build-tools`

Server will run on `localhost/api`.

Front will run on `localhost`.

Postman config export is available at the root of the repository.
