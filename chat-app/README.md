# Simple Chat App

Simple chat app built using MERN stack.

## Getting started

- clone this repo
- open with your favorite editor

```bash
cp env-example .env
```

or

```bash
cp env-example .env.dev
```

or for production

```bash
cp env-example-prod .env.prod
```

- adjust the .env file

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
docker compose -f docker-compose.dev.yaml up -d

```

### Prod environment

```bash
docker compose up -d

```
