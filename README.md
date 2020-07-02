# Cryptocracy Platform

## Setup

0. Install and setup: `node`, `redis`, `mysql`.

1. Clone the repository and install dependencies.

```sh
git clone https://github.com/cryptichunt/platform cryptocracy-platform
cd cryptocracy-platform/backend
npm i
cd ../frontend
npm i
```

2. Copy and populate config files

```sh
cd ../backend
cp .env.example .env
cp config/config.example.json config/config.json
```

3. Create a database and run migrations on it

```sh
MYSQL_URL=<your_mysql_url> prisma migrate up
node seed/run all
```

4. Start a redis server and check if it's running

```sh
redis-server --daemonize yes
ps aux | grep redis-server
```

4. Run the app

```sh
npm run serve:dev
# In another shell
cd ../frontend && npm run start
```
