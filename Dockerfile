FROM node:16.17-alpine

WORKDIR /

COPY package*.json .

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "start:dev"]
