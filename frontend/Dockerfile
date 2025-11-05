FROM node:24-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

RUN npm install -g @angular/cli

COPY . .

CMD ["npm", "run", "start"]

