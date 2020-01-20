# Fuel Project

This project aims to provide a simple way to get detailed information about Gas Stations in France.

## Project status

Straightforward API built on Node with TypeScript and Express.js / Mongoose.

### TODO List so far

#### Generalities / Infrastructure

- ~~Put the API online,~~ preferably with some CI/CD tools hooked to this repository.
- ~~Build a simple user friendly front page allowing to request the API trough a dynamic form or geolocation.~~
- ~~Dockerize the API, MongoDB and the front.~~
- Use the PayloadService as a CRON, and not as an API call.
- GDPR

#### Code

- Swagger on the API
- ~~Clean out some keys of the object returned by the API (rough latitude, longitude...)~~
- ~~Write tests for the API (TDD unfortunately not applied as I didn't have a clear idea of the features)~~
- Weird typing on the GasStations Mongoose model on the "city" field, should be `String` but it is mandatory to use `JSON` instead.
- Use a proper logging solution (eg. Winston) on the PayloadService.

## Instructions

### Local setup

- Install Docker
- Run `docker-compose build` from the root of the repository

### Running the project

- Run `docker-compose up` from the root of the repository

### Testing the project

- Run `docker exec -it fuel_server_1 "bash"` in a new terminal (make sure the project is up before running this)
- Once logged onto the container, run `jest --watchAll`. The tests will run when the watcher detects file changes (TDD). To run the tests once, simply run `jest`.

### Updating dependencies

- Install your new dependency running `npm install` as usual, then run `docker-compose build` from the root of the repository

### Production build

- Run `docker-compose -f docker-compose.prod.yml build`, then `docker-compose -f docker-compose.prod.yml up`

#### On Windows

- If you run into MSBuild errors, launch a PowerShell as administrator and install `windows-build-tools` using this command: `npm install -g --production windows-build-tools`

Server will run on `localhost` on port `3000`.

Front will run on `localhost` on port `8080`.

Postman config export is available at the root of the repository.
