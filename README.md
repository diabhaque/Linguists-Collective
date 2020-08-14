# Linguists Collective

Linguists Collective is a platform for people to hire linguists over the internet

##Tech Map 

Frontend (React, Apollo) <-> Backend (Node.js, graphql-yoga) <-> [Prisma](https://www.prisma.io/docs)

## How to get development environment setup?

1. Install [Docker](https://www.docker.com/get-started)
2. Install [NPM](https://www.npmjs.com/get-npm)
3. Install prisma CLI

   `npm install -g prisma`
   or
   `yarn global add prisma`

4. Setup prisma service



   `cd linguists-collective-server/prisma-api`

   `docker-compose up -d`

5. Deploy schema to `dev` and `test` environments

   `cd linguists-collective-server/prisma-api`

   `prisma deploy -e ../config/dev.env`

   `prisma deploy -e ../config/test.env`

6. Install Node.js server dependencies

   `cd linguists-collective-server`

   `npm install`

7. Install React app dependencies

   `cd linguists-collective-client`

   `yarn install`

## How to start locally

1. Ensure docker is running and prisma service is online
2. In a terminal session start the Node.js server
```
cd linguists-collective-server
npm run dev
```

3. Access GraphQL Playground at [http://localhost:4000](http://localhost:4000)
4. In another terminal session start the React app
```
cd linguists-collective-client
yarn start
```

5. Access React app at [http://localhost:3000](http://localhost:3000)