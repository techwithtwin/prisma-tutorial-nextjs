import AddMovieDrawer from "@/components/add-movie-drawer";
import MovieCard from "@/components/movie-card";
import ToggleColorMode from "@/components/toggle-color-mode";
import prisma from "@/lib/db";
import { marginX } from "@/utils/constants";
// import { data } from "@/utils/constants/data";
import { Flex, Heading, HStack, SimpleGrid, Stack } from "@chakra-ui/react";

export default async function Home() {
  const movies = await prisma.movie.findMany();

  return (
    <Stack mx={marginX} my="3rem" gap="2rem">
      <HStack
        align="center"
        justify="space-between"
        flexDir={{ base: "column", sm: "row" }}
      >
        <Flex gap={2} align="center">
          <Heading>Movies Listing Total {movies.length} </Heading>
          <AddMovieDrawer />
        </Flex>
        <ToggleColorMode />
      </HStack>

      <SimpleGrid columns={{ base: 1, sm: 2, md: 4, lg: 6 }} gap={8}>
        {movies.map((d) => (
          <MovieCard
            key={d.id}
            id={d.id}
            title={d.title}
            poster={d.posterPath}
          />
        ))}
      </SimpleGrid>
    </Stack>
  );
}
