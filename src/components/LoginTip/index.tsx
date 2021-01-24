import * as React from "react";

import { Center, Button, Box, Text } from "@chakra-ui/react";
import { useCurrentUser } from '../../hooks/useCurrentUser'

const LoginTip = () => {
  const [userInfo, isLogin, tools] = useCurrentUser()

  return (
    <Center p={24}>
      <Box>
        <Button w={120} onClick={() => tools.logIn()}> Login </Button>
        <Text textAlign="center" fontWeight={300}>You need login first</Text>
      </Box>
    </Center>
  );
};

export default LoginTip