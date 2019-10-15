# Fuel Project

This project aims to provide a simple way to get detailed information about Gas Stations in France.

## Project status

Straightforward API built on Node with TypeScript and Express.js.

### TODO List so far

- Put the API online, preferably with some CI/CD tools hooked to this repository.
- Build a simple user friendly front page allowing to request the API trough a dynamic form or geolocation.
- Dockerize the API, MongoDB and the front
- Clean out some keys of the object returned by the API (rough latitude, longitude...)
- Write tests for the API (TDD unfortunately not applied as I didn't have a clear idea of the features)

## Instructions

Prior to running the api and pending the dockerization of the app, you need to install MongoDB on your machine, and create a database named `fuel`. Make sure MongoDB service is running before continuing.

Run `npm install`, then start dev server with `npm run dev`.

Server will run on `localhost` on port `8080`.

Postman config export is available at the root of the repository.
