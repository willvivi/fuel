FROM node:10
RUN git clone https://github.com/willvivi/fuel.git
RUN mkdir -p /home/node/app
RUN cp -r fuel/cron/* /home/node/app
WORKDIR /home/node/app
RUN chown -R node:node ./assets
RUN chmod -R 777 ./assets
RUN npm install
RUN npm run build
CMD ["node", "dist/index.js"]