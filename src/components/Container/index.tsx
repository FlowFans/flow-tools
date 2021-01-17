import * as React from "react";
import { Box } from "@chakra-ui/react";

type ContainerProps = {
    children: React.ReactNode
};

const Container = ({children}: ContainerProps) => {
  return (
    <Box >
      {children}
    </Box>
  );
};

export default Container