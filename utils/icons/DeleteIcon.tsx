"use client";

import { ChakraProps, Icon } from "@chakra-ui/react";
import { MdDelete } from "react-icons/md";

const DeleteIcon = (props: ChakraProps) => {
  return <Icon as={MdDelete} {...props} />;
};

export default DeleteIcon;
