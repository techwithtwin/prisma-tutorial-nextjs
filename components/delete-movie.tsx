"use client";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import { useRef } from "react";

interface Props {
  title: string;
  poster: string;
}

const DeleteMovie = ({ title }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<HTMLButtonElement | null>(null);
  return (
    <>
      <Button onClick={onOpen} colorScheme="red" size="sm">
        Delete
      </Button>
      <AlertDialog
        onClose={onClose}
        isOpen={isOpen}
        isCentered
        leastDestructiveRef={cancelRef}
      >
        <AlertDialogOverlay bg="rgba(0,0,0,.8)" />

        <AlertDialogContent>
          <AlertDialogHeader>Delete Movie?</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            Are you sure you want to delete{" "}
            <Box as="span" color="red.300" fontSize="xl">
              {title}
            </Box>
            ? It will be gone forever.
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              No
            </Button>
            <Button colorScheme="red" ml={3}>
              Yes
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default DeleteMovie;
