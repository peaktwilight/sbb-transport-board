FROM nginx:alpine
COPY . /usr/share/nginx/html/
COPY nginx.conf.template /etc/nginx/templates/default.conf.template
RUN rm -f /usr/share/nginx/html/Dockerfile \
         /usr/share/nginx/html/server.py \
         /usr/share/nginx/html/nginx.conf.template \
         /usr/share/nginx/html/js/secrets.js \
    2>/dev/null || true
EXPOSE 80
