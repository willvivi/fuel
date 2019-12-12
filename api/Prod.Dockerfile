FROM node:10
WORKDIR /home/node/app
COPY ./ .
RUN npm install
RUN npm run build 
