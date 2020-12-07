FROM node:lts-alpine

ENV NPM_CONFIG_LOGLEVEL info

WORKDIR /usr/app

COPY . .

RUN ls -la

RUN yarn

CMD yarn start

EXPOSE 3000
