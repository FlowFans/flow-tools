import React, { useEffect } from "react";

import {
  Box, Flex, Avatar, Stat,
  StatNumber,
  StatHelpText,
} from "@chakra-ui/react";
import { MULTIAVATAR_URL } from "../../constants";
import { Account } from "../../constants/types";

import Contracts from "../Contracts";
import { useClipboard } from "@chakra-ui/react"
import { CopyIcon } from '@chakra-ui/icons'

import {toast} from '../../utils'

type AccountInfoProps = {
  accountInfo: Account;
};

const AccountInfo = (props: AccountInfoProps) => {
  const { accountInfo } = props;
  const { address, balance, contracts } = accountInfo;
  const { hasCopied, onCopy } = useClipboard(address)

  useEffect(() => {
    if(!hasCopied) return
    toast({
      title:'copied',
      desc:`address: ${address} copied`,
      duration:1000
    })
  }, [hasCopied])

  return (
    <Box p={4} >
      <Flex mb={4} >
        <Avatar mr={2} name={address} size="lg" src={MULTIAVATAR_URL + address + ".svg"} showBorder />
        <Stat>
          <StatNumber>{balance} Flow</StatNumber>
          <StatHelpText style={{ cursor: 'pointer' }} onClick={onCopy}>{address}   <CopyIcon  w={5} h={5} /></StatHelpText>
        </Stat>
      </Flex>
      <Contracts contracts={contracts} userAddress={address}/>
    </Box>
  );
};

export default AccountInfo;
