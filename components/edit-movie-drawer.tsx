"use client";
import { getImageUrl } from "@/utils/constants/functions";
import {
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
  FormHelperText,
  FormLabel,
  Input,
  useDisclosure,
} from "@chakra-ui/react";
import Image from "next/image";
import { useRef } from "react";

interface Props {
  title: string;
  poster: string;
}

const EditMovieDrawer = ({ title, poster }: Props) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button
        aria-label="edit button"
        size="sm"
        colorScheme="teal"
        onClick={onOpen}
      >
        Edit Movie
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        size="lg"
        initialFocusRef={inputRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Edit {title} Movie</DrawerHeader>

          <DrawerBody>
            <Box h="">
              <Image
                src={getImageUrl(poster)}
                alt={title}
                width={100}
                height={100}
                priority
              />
            </Box>
            <FormControl isRequired mt="1rem">
              <FormLabel>ID</FormLabel>
              <Input placeholder="Enter movie Id" ref={inputRef} />
            </FormControl>
            <FormControl isRequired mt="1rem">
              <FormLabel>Title</FormLabel>
              <Input placeholder="Type here..." ref={inputRef} />
              <FormHelperText>
                {" "}
                We will only edit the title and id since the image is stored
                else where
              </FormHelperText>
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

export default EditMovieDrawer;
