FROM node:20.5.0-alpine AS builder

# Set the working directory to /app
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install dependencies
RUN npm install\
    && npm install -g tsc\
    && npm install -g serve\
    && npm install -g envsub

# Copy the rest of the application code to the container
COPY . .

ARG VITE_REST_API_BASE_URL
ARG VITE_REST_API_ROOT_PATH
ARG VITE_REST_API_VERSION
ARG VITE_SERVE_PORT
COPY .env.template .
RUN envsub\
    --env VITE_REST_API_BASE_URL=$VITE_REST_API_BASE_URL\
    --env VITE_REST_API_ROOT_PATH=$VITE_REST_API_ROOT_PATH\
    --env VITE_REST_API_VERSION=$VITE_REST_API_VERSION\
    .env.template .env

# Build the application
RUN npm run build

EXPOSE $VITE_SERVE_PORT

CMD serve -s dist -l ${VITE_SERVE_PORT}
