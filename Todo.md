### TODO

#### Generalities / Infrastructure

- ~~Put the API online~~
- ~~Build a simple user friendly front page allowing to request the API trough a dynamic form or geolocation.~~
- ~~Dockerize the API, MongoDB and the front.~~
- ~~Use the PayloadService as a CRON, and not as an API call.~~
- Azure DevOps pipelines (or equivalent)

#### Code

- Swagger on the API
- ~~Clean out some keys of the object returned by the API (rough latitude, longitude...)~~
- ~~Write tests for the API (TDD unfortunately not applied as I didn't have a clear idea of the features)~~
- Weird typing on the GasStations Mongoose model on the "city" field, should be `String` but it is mandatory to use `JSON` instead.
- Use a proper logging solution (eg. Winston) on the PayloadService.
- ~~Display update dates on fuels~~
