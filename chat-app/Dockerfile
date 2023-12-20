FROM node:20.5.0-alpine AS builder

ARG PORT

# RUN apk add --no-cache bash
RUN npm i -g typescript ts-node tsc

# Set the Current Working Directory inside the container
WORKDIR /app

COPY package*.json /app/
COPY tsconfig.json /app/

RUN npm install

COPY . .

# Expose port 8080 to the outside world
EXPOSE $PORT

CMD [ "npm", "run", "prod" ]
