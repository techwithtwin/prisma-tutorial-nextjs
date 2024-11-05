"use client";
import { IconButton, useColorMode } from "@chakra-ui/react";
import React from "react";
import { MdSunny } from "react-icons/md";
import { IoMoonSharp } from "react-icons/io5";

const ToggleColorMode = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <IconButton aria-label="toggle color mode" onClick={toggleColorMode}>
      icon={colorMode === "light" ? <IoMoonSharp /> : <MdSunny />}
    </IconButton>
  );
};

export default ToggleColorMode;
