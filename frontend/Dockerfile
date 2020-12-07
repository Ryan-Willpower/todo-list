FROM node:lts-alpine

ENV NPM_CONFIG_LOGLEVEL info

WORKDIR /usr/app

ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.7.3/wait /wait
RUN chmod +x /wait

COPY . .

RUN yarn &&\
  yarn build

CMD /wait && yarn start

EXPOSE 3000
