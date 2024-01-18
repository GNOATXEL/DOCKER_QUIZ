FROM node:21.5.0-alpine3.19
WORKDIR /src/
COPY package*.json ./

RUN npm install

COPY . .

CMD ["npm", "run","start"]
EXPOSE 3000