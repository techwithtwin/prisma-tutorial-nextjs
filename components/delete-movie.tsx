"use client";
import { deleteMovieAction } from "@/actions/delete-movie-action";
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
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useRef } from "react";

interface Props {
  id: number;
  title: string;
  poster: string;
}

const DeleteMovie = ({ title, id }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<HTMLButtonElement | null>(null);
  const toast = useToast();
  const router = useRouter();

  const handleDelete = async () => {
    //delete movie with the given id;

    const res = await deleteMovieAction(id);

    toast({
      title: res.status === "success" ? "Success" : "Error",
      description: res.body.message,
      status: res.status,
      position: "top",
      duration: 3000,
      isClosable: true,
    });

    if (res.status === "success") {
      router.refresh();
    }

    onClose();
  };
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
            <Button colorScheme="red" ml={3} onClick={handleDelete}>
              Yes
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default DeleteMovie;
