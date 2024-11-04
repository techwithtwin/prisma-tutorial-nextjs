"use client";
import {
  Alert,
  AlertIcon,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  useDisclosure,
} from "@chakra-ui/react";
import { useRef } from "react";

const AddMovieDrawer = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
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
        onClose={onClose}
        size="lg"
        initialFocusRef={inputRef}
      >
        <DrawerOverlay bg="rgba(0,0,0,.8)" />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Add Movie</DrawerHeader>

          <DrawerBody>
            <Alert status="error" borderRadius="md">
              <AlertIcon />
              Check the README for sample movies or use TMDB api to get movies
              https://www.themoviedb.org/
            </Alert>
            <FormControl isRequired mt="1rem">
              <FormLabel>ID</FormLabel>
              <Input placeholder="Enter movie Id" ref={inputRef} />
              <FormHelperText>
                Enter Movie id here check on the Readme
              </FormHelperText>
            </FormControl>
            <FormControl isRequired mt="1rem">
              <FormLabel>Image Url</FormLabel>
              <Input placeholder="paste image url" ref={inputRef} />
              <FormHelperText>
                Enter Url above e.g /YLyORLsYIjC0d1TFBSpJKk7piP.jpg
              </FormHelperText>
            </FormControl>

            <FormControl isRequired mt="1rem">
              <FormLabel>Title</FormLabel>
              <Input placeholder="Type here..." ref={inputRef} />
              <FormHelperText>Movie Title </FormHelperText>
            </FormControl>
          </DrawerBody>

          <DrawerFooter>
            <Button colorScheme="red" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="blue">Save</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default AddMovieDrawer;
