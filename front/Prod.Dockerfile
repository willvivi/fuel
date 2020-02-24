FROM nginx:1.17.8-alpine
WORKDIR /home/app
COPY ./ .
RUN apk update
RUN apk add nodejs
RUN npm run build 
COPY build /usr/share/nginx/html

