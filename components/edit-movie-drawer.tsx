"use client";
import { editMovieAction } from "@/actions/edit-movie-action";
import { EditMovieFormdata, EditMovieSchema } from "@/schema";
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
  FormErrorIcon,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface Props {
  id: number;
  title: string;
  poster: string;
}

const EditMovieDrawer = ({ title, poster, id }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EditMovieFormdata>({
    resolver: zodResolver(EditMovieSchema),
    mode: "onChange",
    defaultValues: {
      title: title,
    },
  });

  const onSubmit = async (data: EditMovieFormdata) => {
    setIsLoading(true);

    const res = await editMovieAction(data, id);

    setIsLoading(false);

    if (res.status === "success") {
      router.refresh();
      customClose();
    }

    toast({
      title: res.status === "success" ? "Success" : "Error",
      description: res.body.message,
      status: res.status,
      position: "top",
      duration: 3000,
      isClosable: true,
    });
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
        colorScheme="teal"
        onClick={onOpen}
      >
        Edit Movie
      </Button>
      <Drawer isOpen={isOpen} placement="right" onClose={customClose} size="lg">
        <Box as="form" onSubmit={handleSubmit(onSubmit)}>
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
              <FormControl isRequired mt="1rem" isInvalid={!!errors.title}>
                <FormLabel>Enter New Title</FormLabel>
                <Input placeholder="Type here..." {...register("title")} />
                {errors.title ? (
                  <FormErrorMessage>
                    <FormErrorIcon /> {errors.title.message}
                  </FormErrorMessage>
                ) : (
                  <FormHelperText>
                    We will only edit the title since the image is stored else
                    where
                  </FormHelperText>
                )}
              </FormControl>
            </DrawerBody>

            <DrawerFooter>
              <Button colorScheme="red" mr={3} onClick={customClose}>
                Cancel
              </Button>
              <Button colorScheme="blue" type="submit" isLoading={isLoading}>
                Save
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </Box>
      </Drawer>
    </>
  );
};

export default EditMovieDrawer;
