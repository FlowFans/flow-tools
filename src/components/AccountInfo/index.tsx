import React, { useEffect } from "react";

import {
  Box, Flex, Stat,
  StatNumber,
  StatHelpText,
  Divider
} from "@chakra-ui/react";
import { Account } from "../../constants/types";

import Contracts from "../Contracts";
import { useClipboard } from "@chakra-ui/react"
import { CopyIcon } from '@chakra-ui/icons'

import { toast } from '../../utils'
import Avatar from '../Avatar'

import { fmtFlow } from '../../utils'

type AccountInfoProps = {
  accountInfo: Account;
};

const AccountInfo = (props: AccountInfoProps) => {
  const { accountInfo } = props;
  const { address, balance, contracts } = accountInfo;
  const { hasCopied, onCopy } = useClipboard(address)

  useEffect(() => {
    if (!hasCopied) return
    toast({
      title: 'copied',
      desc: `address: ${address} copied`,
      duration: 1000
    })
  }, [hasCopied])

  return (
    <Box p={4} >
      <Flex mb={4} >
        <Avatar address={address} />
        <Stat>
          <StatNumber>{fmtFlow(balance)} Flow</StatNumber>
          <StatHelpText style={{ cursor: 'pointer' }} onClick={onCopy}>{address}   <CopyIcon w={5} h={5} /></StatHelpText>
        </Stat>
      </Flex>
      <Divider mt={4} mb={4} borderColor="gray" />
      <Contracts contracts={contracts} userAddress={address} />
    </Box>
  );
};

export default AccountInfo;
