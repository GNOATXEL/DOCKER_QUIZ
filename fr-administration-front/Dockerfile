FROM node:18-alpine
WORKDIR /src/app

RUN npm install -g @angular/cli

COPY package*.json ./

RUN npm ci

COPY . .

CMD ["ng", "serve","--host","0.0.0.0"]
EXPOSE 4200
