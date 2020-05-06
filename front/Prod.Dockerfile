FROM nginx:1.17.8-alpine
WORKDIR /home/app
COPY ./ .
RUN apk add --update g++ make nodejs npm python python-dev
RUN npm install
RUN npm run build 
RUN rm /etc/nginx/conf.d/default.conf
RUN cp nginx/conf.d/default.conf /etc/nginx/conf.d/
RUN cp -R build/* /usr/share/nginx/html/

