##################
# DEVELOPMENT
##################

FROM node:lts-buster-slim AS development

RUN apt-get update && apt-get install libssl-dev ca-certificates procps -y
WORKDIR /usr/src/app

COPY package*.json yarn.lock ./

RUN yarn add -g glob rimraf prisma

RUN yarn install

COPY . .

COPY .env /usr/src/app/

ENV NODE_ENV development

RUN yarn prisma:gen

EXPOSE 4000

CMD [ "npm", "dev" ]