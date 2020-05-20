FROM nginx:1.17.8-alpine
WORKDIR /home/app
RUN apk add --update git g++ make nodejs npm python python-dev
RUN git clone https://github.com/willvivi/fuel.git .
RUN cd front && npm install
RUN cd front && npm run build 
RUN rm /etc/nginx/conf.d/default.conf
RUN cp ./front/openshift/nginx/conf.d/default.conf /etc/nginx/conf.d/
RUN cp -R front/build/* /usr/share/nginx/html/
RUN chgrp -R root /var/cache/nginx /var/run /var/log/nginx && \
    chmod -R 770 /var/cache/nginx /var/run /var/log/nginx
EXPOSE 8080

