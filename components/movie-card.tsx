import { getImageUrl } from "@/utils/constants/functions";
import { Badge, Flex, Heading, Stack } from "@chakra-ui/react";
import Image from "next/image";
import EditMovieDrawer from "./edit-movie-drawer";
import DeleteMovie from "./delete-movie";

interface Props {
  id: number;
  title: string;
  poster: string;
}

const MovieCard = ({ id, title, poster }: Props) => {
  return (
    <Stack
      gap={4}
      border="2px solid transparent"
      _hover={{
        borderColor: "gray.300",
      }}
    >
      <Image src={getImageUrl(poster)} alt={title} width={500} height={750} />
      <Stack h="100%" p={2} gap={4}>
        <Heading fontSize="xl">{title}</Heading>

        <Badge fontSize="lg" colorScheme="green" w="fit-content">
          ID: {id}
        </Badge>
        <Flex justify="space-between" align="center" mt="auto">
          <EditMovieDrawer title={title} poster={poster} id={id} />
          <DeleteMovie title={title} poster={poster} id={id} />
        </Flex>
      </Stack>
    </Stack>
  );
};

export default MovieCard;
