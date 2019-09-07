FROM node:10-alpine

WORKDIR /myapp

ADD package.json /myapp/package.json
RUN npm install

ADD . /myapp