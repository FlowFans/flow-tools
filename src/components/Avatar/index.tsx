import * as React from "react";
import { MULTIAVATAR_URL } from "../../constants";

import { Avatar as Ava } from "@chakra-ui/react";


const Avatar = ({address='0x', ...rest}) => {
  return (
    <Ava mr={2} name={address} size="lg" src={MULTIAVATAR_URL + address + ".svg"} showBorder {...rest}/>
  );
};

export default Avatar