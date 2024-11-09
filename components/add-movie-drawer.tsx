"use client";
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  FormControl,
  FormErrorIcon,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MovieFormdata, MovieSchema } from "@/schema";
import { addMovieAction } from "@/actions/add-movie-action";
import { useRouter } from "next/navigation";

const AddMovieDrawer = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<MovieFormdata>({
    resolver: zodResolver(MovieSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: MovieFormdata) => {
    setIsLoading(true);

    const res = await addMovieAction(data);

    setIsLoading(false);

    toast({
      title: res.status === "success" ? "Success" : "Error",
      description: res.body.message,
      status: res.status,
      position: "top",
      duration: 3000,
      isClosable: true,
    });

    if (res.status === "success") {
      customClose();
      router.refresh();
      return;
    }
  };
  const customClose = () => {
    onClose();
    reset();
  };
  return (
    <>
      <Button
        aria-label="edit button"
        size="sm"
        colorScheme="red"
        onClick={onOpen}
      >
        Add Movie Movie +
      </Button>

      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={customClose}
        size="lg"
        initialFocusRef={inputRef}
      >
        <DrawerOverlay bg="rgba(0,0,0,.8)" />
        <Box as="form" onSubmit={handleSubmit(onSubmit)}>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Add Movie</DrawerHeader>

            <DrawerBody>
              <Alert status="error" borderRadius="md">
                <AlertIcon />
                Check the README for sample movies or use TMDB api to get movies
                https://www.themoviedb.org/
              </Alert>
              <FormControl isRequired mt="1rem" isInvalid={!!errors.id}>
                <FormLabel>ID</FormLabel>
                <Input
                  type="number"
                  placeholder="Enter movie Id"
                  {...register("id")}
                />
                {errors.id ? (
                  <FormErrorMessage>
                    <FormErrorIcon />
                    {errors.id.message}
                  </FormErrorMessage>
                ) : (
                  <FormHelperText>
                    Enter Movie id here check on the Readme
                  </FormHelperText>
                )}
              </FormControl>
              <FormControl isRequired mt="1rem" isInvalid={!!errors.imageUrl}>
                <FormLabel>Image Url</FormLabel>
                <Input
                  {...register("imageUrl")}
                  placeholder="paste image url"
                />
                {errors.imageUrl ? (
                  <FormErrorMessage>
                    <FormErrorIcon />
                    {errors.imageUrl.message}
                  </FormErrorMessage>
                ) : (
                  <FormHelperText>
                    Enter Url above e.g /qDWA7fB4cZ4sBP6YgwlxvraDHi7.jpg
                  </FormHelperText>
                )}
              </FormControl>
              <FormControl isRequired mt="1rem" isInvalid={!!errors.title}>
                <FormLabel>Title</FormLabel>
                <Input {...register("title")} placeholder="Type here..." />
                {errors.title ? (
                  <FormErrorMessage>
                    <FormErrorIcon />
                    {errors.title.message}
                  </FormErrorMessage>
                ) : (
                  <FormHelperText>Movie Title </FormHelperText>
                )}
              </FormControl>{" "}
            </DrawerBody>

            <DrawerFooter>
              <Button colorScheme="red" mr={3} onClick={customClose}>
                Cancel
              </Button>
              <Button isLoading={isLoading} colorScheme="blue" type="submit">
                Save
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </Box>
      </Drawer>
    </>
  );
};

export default AddMovieDrawer;
