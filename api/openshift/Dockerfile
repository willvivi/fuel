FROM node:11
WORKDIR /home/node/app
RUN git clone https://github.com/willvivi/fuel.git .
RUN chown -R node:node ./api/assets
RUN cd api && npm install
RUN cd api && npm run build
RUN ls api/dist
EXPOSE 8080
CMD ["node", "api/dist/index.js"]
