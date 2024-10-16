FROM node:20.17.0

WORKDIR /usr/src/app

COPY ./backend/package*.json ./

COPY ./backend .

RUN npm install

EXPOSE 3001

CMD ["npm", "run", "start"]