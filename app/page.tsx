import AddMovieDrawer from "@/components/add-movie-drawer";
import MovieCard from "@/components/movie-card";
import { marginX } from "@/utils/constants";
import { data } from "@/utils/constants/data";
import { Flex, Heading, SimpleGrid, Stack } from "@chakra-ui/react";

export default function Home() {
  return (
    <Stack mx={marginX} my="3rem" gap="2rem">
      <Flex gap={2} align="center">
        <Heading>Movies Listing Total {data.length} </Heading>
        <AddMovieDrawer />
      </Flex>
      <SimpleGrid columns={{ base: 1, sm: 2, md: 4, lg: 6 }} gap={8}>
        {data.map((d) => (
          <MovieCard
            key={d.id}
            id={d.id}
            title={d.title}
            poster={d.poster_path}
          />
        ))}
      </SimpleGrid>
    </Stack>
  );
}
