FROM nginx:1.17.8-alpine
WORKDIR /home/app
COPY ./ .
RUN apk add --update nodejs npm
RUN npm run build 
COPY build /usr/share/nginx/html

