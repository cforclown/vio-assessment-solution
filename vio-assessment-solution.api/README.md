# virtuals.io Assessment Solution API

## Requirements

- Docker
- Your favorite code editor (preferred VSCode)

## Getting started

This instruction is to run this API only.

### Run in Docker

#### Dev environment

generate `.env` file

```bash
cp env-example .env

```

adjust `.env` values or leave it as it is with default values

Start the docker container

```bash
docker compose -f docker-compose.dev.yaml up -d

```

#### Prod environment

```bash
cp env-example-prod .env.prod

```

adjust `.env.prod` values or leave it with default values

```bash
docker compose --env-file ./.env.prod up -d

```


### Run Locally

open this folder (vio-assessment-solution.api) with your favorite editor

```bash
cp env-example .env
```

you will need to change the `DB_HOST` to `localhost` environment variables in .env file

```bash
DB_HOST=localhost

```

start mongodb docker container

```bash
docker compose -f docker-compose.dev.yaml up -d vio-assessment-solution-mongo

```

install dependencies


```bash
npm install
```

start API

```bash
npm start
```

or

```bash
npm run dev 
```
