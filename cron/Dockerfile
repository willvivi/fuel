FROM node:16.15.0
ENV NODE_ENV development
WORKDIR /home/node/app
COPY package*.json ./
RUN npm install -g jest ts-jest
RUN npm install 
RUN mkdir -p node_modules/.cache && chmod -R 777 node_modules/.cache

