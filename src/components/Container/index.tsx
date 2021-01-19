import * as React from "react";
import { Box } from "@chakra-ui/react";

type ContainerProps = {
    children: React.ReactNode
};

const Container = ({children}: ContainerProps) => {
  return (
    <Box p={4}>
      {children}
    </Box>
  );
};

export default Container