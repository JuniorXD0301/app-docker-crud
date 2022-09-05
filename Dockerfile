FROM node:12

WORKDIR /app

COPY ["package*.json","./server/package.json"]

RUN ["npm", "install"]

COPY . .

#CMD ["node",""]
RUN ["npm", "install", "typescript", "-g"]
RUN ["npm", "install", "pm2", "-g"]

WORKDIR /app/server

RUN ["npm", "run", "build:prod"]
RUN ["pm2", "start", "build/index.js", "--name", "server"]

#Instalo angular
RUN npm install -g @angular/cli

EXPOSE 3000