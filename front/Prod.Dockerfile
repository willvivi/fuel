FROM node:10
WORKDIR /home/node/app
COPY package*.json ./
RUN npm run build 
