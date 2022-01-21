# FROM nginx
# COPY ./nginx.conf.bkp /etc/nginx/conf.d/default.conf

# COPY /dist/servicedesk-project /usr/share/nginx/html


### STAGE 1: Build ###
FROM node:14-alpine AS build
# set working directory

WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm install -g npm
RUN npm install --unsafe-perm=true
COPY . .
RUN npm run build:poc --verbose


### STAGE 2: Run ###
FROM nginx:stable-alpine
WORKDIR /app

COPY --from=build /usr/src/app/dist/servicedesk-project /usr/share/nginx/html

# COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY ./nginx.conf.bkp /etc/nginx/conf.d/default.conf
