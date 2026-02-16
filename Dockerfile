FROM nginx:alpine
COPY . /usr/share/nginx/html/
RUN rm /usr/share/nginx/html/Dockerfile /usr/share/nginx/html/server.py 2>/dev/null || true
EXPOSE 80
