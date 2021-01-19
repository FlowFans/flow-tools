import * as React from "react";

import { Box, Flex, Spacer } from "@chakra-ui/react";
import {useCurrentUser} from '../../hooks/useCurrentUser'
import {useAccountInfo} from '../../hooks/useAccount'
type AccountInfoProps = {};

const AccountInfo = (props: AccountInfoProps) => {
    const [currentUser] = useCurrentUser()
    const {accountInfo} = useAccountInfo(currentUser.addr)
    
  return (
    <Box p={4}>
        
    </Box>
  );
};

export default AccountInfo