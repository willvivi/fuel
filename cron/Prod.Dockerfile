FROM node:16.15.0
WORKDIR /home/node/app
COPY ./ .
RUN chown -R node:node ./assets
RUN npm install
RUN npm run build 
