import * as React from "react";
import { Box } from "@chakra-ui/react";
import { useMediaQuery } from "@chakra-ui/react"

type ContainerProps = {
  children: React.ReactNode
};

const Container = ({ children }: ContainerProps) => {
  const [isLargerThan1280] = useMediaQuery("(min-width: 1280px)")
  const pxConfig = isLargerThan1280 ? 48 : 2
  return (
    <Box pt={4} px={pxConfig} >
      {children}
    </Box>
  );
};

export default Container