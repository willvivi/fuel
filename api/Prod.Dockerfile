FROM node:10
WORKDIR /home/node/app
COPY ./ .
RUN mkdir -p assets/extracts
RUN npm install
RUN npm run build 
