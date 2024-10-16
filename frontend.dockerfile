FROM node:20.17.0-alpine

WORKDIR /usr/src/app

ARG NODE_ENV

COPY ./frontend .

RUN npm install

EXPOSE 5173

CMD ["npm", "run", "dev", "--host"]