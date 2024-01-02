FROM node:lts-alpine

RUN apk update && apk add bash

WORKDIR /usr/app

COPY ./pnpm-lock.yaml ./
COPY ./package.json ./
COPY ./dist .
COPY ./keys .
COPY ./.env.production .

# install pnpm
RUN npm install -g pnpm
RUN pnpm install

# set node_env=production
ENV NODE_ENV=production

CMD ["node", "src/mainServer.js"]