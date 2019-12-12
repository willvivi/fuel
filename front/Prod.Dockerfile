FROM node:10
WORKDIR /home/node/app
COPY ./ .
RUN npm install -g serve
RUN npm install
RUN npm run build 
