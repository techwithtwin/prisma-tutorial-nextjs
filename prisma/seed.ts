import { data as moviesToSeed } from "../utils/constants/data";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const movies = await prisma.movie.createMany({
    data: moviesToSeed.map((movie) => ({
      id: movie.id,
      title: movie.title,
      posterPath: movie.poster_path,
    })),
  });
  console.log(movies.count);
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
