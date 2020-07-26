FROM node:12.18

RUN mkdir /strapi
WORKDIR /strapi

COPY ./yarn.lock /strapi/yarn.lock
COPY ./package.json /strapi/package.json
COPY . /strapi

RUN yarn install && yarn cache clean

ENV HOST 0.0.0.0
