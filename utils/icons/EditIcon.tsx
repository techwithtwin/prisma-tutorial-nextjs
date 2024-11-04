"use client";

import { ChakraProps, Icon } from "@chakra-ui/react";
import { RiEdit2Fill } from "react-icons/ri";

const EditIcon = (props: ChakraProps) => {
  return <Icon as={RiEdit2Fill} {...props} />;
};

export default EditIcon;
