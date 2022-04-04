
# Movie rating

A React Native, NestJS, GraphQL & Prisma project. 

Discover movies, add your favorite to your list with a review & rating, find out other people's list.




## Installation

Install dependencies 

```bash
  cd app
  npm install // or yarn
  cd ../nest-api
  npm install // or yarn
```
    
Make sure you are running a postgresql server locally and create a database named movierating then:

```bash
    npx prisma db push  // or yarn prisma db push
    npx prisma generate // or yarn prisma generate
```

The 2 above commands will push migrations to your database and generate js artifacts respectively

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file 

expo app .env file

`TMDB_KEY=[YOUR TMDB API KEY]`


nestjs .env file

`DATABASE_URL="postgresql://[POSTGRES_USERNAME]:[POSTGRES_PASSWORD]@localhost:5432/movierating?schema=public"`

`jwtSecret=[A_RANDOM_KEY]`

`ENV=DEV`
`TMDB_KEY=[YOUR TMDB API KEY]`

## Screenshots

![App Screenshot](https://i.ibb.co/RYgpdjC/Screenshot-8.png)
![App Screenshot](https://i.ibb.co/sJdvjt6/Screenshot-7.png)
![App Screenshot](https://i.ibb.co/fNdfGTJ/Screenshot-4.png)
![App Screenshot](https://i.ibb.co/KV9vZmk/Screenshot-5.png)
![App Screenshot](https://i.ibb.co/Y3q8F3n/Screenshot-6.png)