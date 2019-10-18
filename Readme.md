# Fuel Project

This project aims to provide a simple way to get detailed information about Gas Stations in France.

## Project status

Straightforward API built on Node with TypeScript and Express.js / Mongoose.

### TODO List so far

#### Generalities / Infrastructure

- Put the API online, preferably with some CI/CD tools hooked to this repository.
- Build a simple user friendly front page allowing to request the API trough a dynamic form or geolocation.
- ~~Dockerize the API, MongoDB and the front.~~
- Use the PayloadService as a CRON, and not as an API call.

#### Code

- Clean out some keys of the object returned by the API (rough latitude, longitude...)
- Write tests for the API (TDD unfortunately not applied as I didn't have a clear idea of the features)
- Weird typing on the GasStations Mongoose model on the "city" field, should be `String` but it is mandatory to use `JSON` instead.
- Use a proper logging solution (eg. Winston) on the PayloadService.

## Instructions

- Install docker
- Run `docker-compose up` from the root of the repository

Server will run on `localhost` on port `3000`.

Postman config export is available at the root of the repository.
