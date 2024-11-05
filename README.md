# Prisma tutorial

## Clone the initial branch to be at par with the project

`git clone --single-branch -b initial git@github.com:techwithtwin/prisma-tutorial-nextjs.git`

## I'm using PNPM

you can use any package manager you prefer
`pnpm install`

## Run the development server

`pnpm dev`

## Styling

Styling is using [chakra ui component library](https://chakra-ui.com)

## Initializing prisma

Run the following in your project root

`npx prisma init`

This will create a prisma directory with a schema.prisma and also a .env with a sample connection string

### Create DB using the specified database type

Whether using mysql or postgres go to your database management tool and create a database and come and update on your .env

### Creating your schema

Create schema on the schema.prisma file in the prisma folder based on your requirements

### Generate Migrations

Run the following command to generate migrations

`npx prisma generate`

Run the following command to apply the changes to the db

`npx prisma migrate dev`

### Seeding the DB

install the ts-node utility
`npm install -D ts-node @types/node`

Add the prisma.seed field to your package.json file:

```json
{
  "name": "my-project",
  "version": "1.0.0",
  "prisma": {
    "seed": "ts-node --compiler-options {\"module\":\"CommonJS\"} prisma/seed.ts"
  },
  "devDependencies": {
    "@types/node": "^14.14.21",
    "ts-node": "^9.1.1",
    "typescript": "^4.1.3"
  }
}
```

Run the seed command in the CLI
`npx prisma db seed`

## Prisma best practices NEXTJS

[db.ts](https://www.prisma.io/docs/orm/more/help-and-troubleshooting/help-articles/nextjs-prisma-client-dev-practices)

```ts
import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
  return new PrismaClient();
};

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = prisma;
```

## Test Movies

use these test movies to create new movies you can find more on the [TMDB API](https://www.themoviedb.org/)

```json

{
        "adult": false,
        "backdrop_path": "/YLyORLsYIjC0d1TFBSpJKk7piP.jpg",
        "genre_ids": [
            16,
            18,
            10749
        ],
        "id": 504253,
        "original_language": "ja",
        "original_title": "君の膵臓をたべたい",
        "overview": "After his classmate and crush is diagnosed with a pancreatic disease, an average high schooler sets out to make the most of her final days.",
        "popularity": 28.836,
        "poster_path": "/qDWA7fB4cZ4sBP6YgwlxvraDHi7.jpg",
        "release_date": "2018-09-01",
        "title": "I Want to Eat Your Pancreas",
        "video": false,
        "vote_average": 8.224,
        "vote_count": 1536
    },
    {
        "adult": false,
        "backdrop_path": "/jr8tSoJGj33XLgFBy6lmZhpGQNu.jpg",
        "genre_ids": [
            16,
            12,
            14,
            35,
            10751
        ],
        "id": 315162,
        "original_language": "en",
        "original_title": "Puss in Boots: The Last Wish",
        "overview": "Puss in Boots discovers that his passion for adventure has taken its toll: He has burned through eight of his nine lives, leaving him with only one life left. Puss sets out on an epic journey to find the mythical Last Wish and restore his nine lives.",
        "popularity": 200.866,
        "poster_path": "/kuf6dutpsT0vSVehic3EZIqkOBt.jpg",
        "release_date": "2022-12-07",
        "title": "Puss in Boots: The Last Wish",
        "video": false,
        "vote_average": 8.2,
        "vote_count": 7702
    },
    {
        "adult": false,
        "backdrop_path": "/uUrV5KSjnZx47Dq7e6STr73iN4N.jpg",
        "genre_ids": [
            18,
            35
        ],
        "id": 24188,
        "original_language": "it",
        "original_title": "Il sorpasso",
        "overview": "Roberto, a shy law student in Rome, meets Bruno, a forty-year-old exuberant, capricious man, who takes him for a drive through the Roman and Tuscany countries in the summer. When their journey starts to blend into their daily lives though, the pair’s newfound friendship is tested.",
        "popularity": 9.995,
        "poster_path": "/4h1ckrJQVcQYjeOkqS8i9BqZ9MI.jpg",
        "release_date": "1962-12-05",
        "title": "Il Sorpasso",
        "video": false,
        "vote_average": 8.223,
        "vote_count": 739
    },
    {
        "adult": false,
        "backdrop_path": "/sQkRiQo3nLrQYMXZodDjNUJKHZV.jpg",
        "genre_ids": [
            16,
            28,
            878
        ],
        "id": 618344,
        "original_language": "en",
        "original_title": "Justice League Dark: Apokolips War",
        "overview": "Earth is decimated after intergalactic tyrant Darkseid has devastated the Justice League in a poorly executed war by the DC Super Heroes. Now the remaining bastions of good – the Justice League, Teen Titans, Suicide Squad and assorted others – must regroup, strategize and take the war to Darkseid in order to save the planet and its surviving inhabitants.",
        "popularity": 27.342,
        "poster_path": "/c01Y4suApJ1Wic2xLmaq1QYcfoZ.jpg",
        "release_date": "2020-05-05",
        "title": "Justice League Dark: Apokolips War",
        "video": false,
        "vote_average": 8.22,
        "vote_count": 1450
},

```
