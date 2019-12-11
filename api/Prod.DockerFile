FROM node:10
WORKDIR /home/node/app
COPY package*.json ./
RUN npm install -g serve
RUN npm install
RUN npm run build 
