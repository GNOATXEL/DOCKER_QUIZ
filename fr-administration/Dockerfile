FROM node:21.5.0-alpine3.19
WORKDIR /src/

RUN npm i -g @nestjs/cli

COPY package*.json ./

RUN npm ci
RUN npm rebuild bcrypt

COPY . .

CMD ["npm", "run","start"]
EXPOSE 3000
