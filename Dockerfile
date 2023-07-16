FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
COPY dist/ ./

RUN mkdir uploads

RUN npm install

ENV NODE_ENV=production

EXPOSE 3000

CMD [ "npm", "start" ]