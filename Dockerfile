FROM node:22-alpine

RUN npm install -g firebase-tools

WORKDIR /app
