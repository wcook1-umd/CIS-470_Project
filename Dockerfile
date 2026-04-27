FROM node:24

WORKDIR /app

COPY . /app

RUN npm install

ENTRYPOINT ["npm", "start"]
