FROM nginx:1.17.8-alpine
WORKDIR /home/app
COPY ./ .
RUN apk add --update nodejs npm
RUN npm install
RUN npm run build 
RUN cp -R build/* /usr/share/nginx/html/

