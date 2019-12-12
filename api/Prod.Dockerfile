FROM node:10
WORKDIR /home/node/app
COPY ./ .
RUN chown -R node:node ./assets
RUN npm install
RUN npm run build 
