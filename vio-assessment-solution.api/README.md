# virtuals.io Assessment Solution

## Getting started

- clone this repo
- open with your favorite editor

```bash
cp env-example .env
```

adjust `.env` values or leave it with default values

```bash
npm install
```

```bash
npm start
```

or

```bash
npm run dev 
```

## Test in Docker

### Dev environment

```bash
cp env-example .env

```

adjust `.env` values or leave it with default values

```bash
docker compose -f docker-compose.dev.yaml up -d

```

### Prod environment

```bash
cp env-example-prod .env.prod

```

adjust `.env.prod` values or leave it with default values

```bash
docker compose --env-file ./.env.prod up -d

```
