# CarExpress

Vehicle history report platform.

- `api/` — NestJS backend (`@carexpress/api`), MongoDB + JWT, port `4000`
- `web/` — Next.js 14 frontend (`@carexpress/web`), port `3000`
- `docker-compose.yml` — runs `api`, `web`, and a local `mongo` together

## Quick start

```bash
cp api/.env.example api/.env
cp web/.env.example web/.env

docker compose up --build
```

- Web: http://localhost:3000
- API: http://localhost:4000/api
- Mongo: `mongodb://localhost:27017/carexpress`

Source folders are mounted as volumes, so edits hot-reload both services.

## Stop

```bash
docker compose down          # stop containers, keep data
docker compose down -v       # also wipe mongo data
```

## Project structure

```
carexpress/
├── api/                 NestJS service
│   ├── src/
│   ├── Dockerfile.dev
│   └── .env.example
├── web/                 Next.js app
│   ├── app/
│   ├── components/
│   ├── lib/
│   ├── Dockerfile.dev
│   └── .env.example
├── docker-compose.yml
├── .env.example
└── README.md
```
