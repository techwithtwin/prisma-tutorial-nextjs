"use client";
import { Icon, IconButton, useColorMode } from "@chakra-ui/react";
import React from "react";
import { MdSunny } from "react-icons/md";
import { IoMoonSharp } from "react-icons/io5";

const ToggleColorMode = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <IconButton
      aria-label="toggle color mode"
      onClick={toggleColorMode}
      icon={
        colorMode === "light" ? (
          <Icon as={IoMoonSharp} boxSize={6} />
        ) : (
          <Icon as={MdSunny} boxSize={6} />
        )
      }
    />
  );
};

export default ToggleColorMode;
