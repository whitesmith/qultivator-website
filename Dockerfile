FROM nginx

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY key.pem cert.pem /etc/nginx/ssl/
COPY dist /usr/share/nginx/html
