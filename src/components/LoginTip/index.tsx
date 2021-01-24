import * as React from "react";

import { Center, Button } from "@chakra-ui/react";
import {useCurrentUser} from '../../hooks/useCurrentUser'

const LoginTip = () => {
  const [userInfo, isLogin, tools] = useCurrentUser()

  return (
      <Center pos="absolute" bottom="0" h="100vh" width="100vw">
        <Button onClick={()=>tools.logIn()}> Login </Button>
      </Center>
  );
};

export default LoginTip