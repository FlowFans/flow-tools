import React, { useEffect, useState } from "react";
import { useHistory, RouteComponentProps } from "react-router-dom";
import { Box, Button, Center, Divider, VStack, HStack, Text, Link, Tag, useDisclosure } from "@chakra-ui/react"

import Container from "../../components/Container";
import { setupAccountWithToken, isAccountSetup, getBalance } from '../../flow/fungibleToken'
import { useCurrentUserAddr } from '../../hooks/useCurrentUser'
import { useAccountInfo } from '../../hooks/useAccount'
import { ContractCode } from '../../components/Contracts'
import { ContractStats } from '../../components/Contracts/ContractStats'
import Avatar from '../../components/Avatar'
import { contractCodeType } from '../../utils'
import { RepeatIcon } from '@chakra-ui/icons'

import MintFTModal from '../../components/Modals/MintFTModal'
import TransferFTModal from '../../components/Modals/TransferFTModal'

export default function FungibleTokenDetail(
  props: RouteComponentProps<{ contractAddress: string; contractName: string }>
) {
  const history = useHistory();
  const {
    match: {
      params: { contractAddress, contractName },
    },
  } = props;
  if (!contractAddress && !contractName) {
    history.push(`/ft`);
  }

  const currentUserAddr = useCurrentUserAddr()
  const { accountInfo, refresh } = useAccountInfo(contractAddress)
  const code = accountInfo.contracts[contractName]
  const [hasSetup, setSetupState] = useState(false)
  const [balance, setBalance] = useState(0)
  const [loading, setLoading] = useState(false)
  const contractType = contractCodeType(code)

  const isAdmin = currentUserAddr === contractAddress


  const setupAccount = async () => {
    setLoading(true)
    const res = await setupAccountWithToken(contractAddress, contractName, currentUserAddr)
    setLoading(false)
    console.log(res, 'set result')
  }

  const queryBalance = async () => {
    console.log('--------query inner----------', currentUserAddr)
    const balance = await getBalance(contractAddress, contractName, currentUserAddr)
    setBalance(balance)
    return balance
  }

  // refresh balance for modal
  const modalCallback = hasSetup ? queryBalance : ()=>{}
  const MintProps = {
    ...useDisclosure(),
    contractAddress,
    contractName,
    cb:()=>modalCallback()
  }

  const TransProps = {
    ...useDisclosure(),
    contractAddress,
    contractName,
    cb:()=>modalCallback()
  }
  
  
  useEffect(() => {
    const querySetupInfo = async () => {
      const res = await isAccountSetup(contractAddress, contractName, currentUserAddr)
      // const res = await getTotalSupply(contractAddress, contractName)
      setSetupState(res)
      if (res) {
        queryBalance()
      }
    }
    querySetupInfo()
  }, [contractAddress, contractName, currentUserAddr, hasSetup, loading])

 

  return <Container>
    <Center p={4} spacing="24px" >
      {hasSetup ?
        <VStack w="100%" p={8} shadow="md">
          <Avatar address={currentUserAddr} />
          <Text>
            addr: <Link onClick={() => history.push(`/account/${currentUserAddr}`)}>{currentUserAddr}</Link>{isAdmin && <Tag colorScheme='orange'>Admin</Tag>}
          </Text>
          <Text>
            balance: {balance} <Text as='kbd' fontWeight={500}>{contractName}<RepeatIcon onClick={() => queryBalance()} /></Text>
          </Text>
        </VStack> :
        <VStack height="50px" spacing="24px" mb={8}>
          <Text>
            you need to set up your contract to receive and query your token
          </Text>
          <Button w='140px' colorScheme='teal' isLoading={loading} onClick={setupAccount}>Setup Account</Button>
        </VStack>
      }
    </Center>
    {contractType === 'FT' && hasSetup &&
      <HStack flex='1' justifyContent="center">
        {isAdmin && <Button colorScheme="green" onClick={()=> MintProps.onOpen()}  >
          Mint
        </Button>}
        <Button colorScheme="teal" onClick={()=> TransProps.onOpen()}>
          Send
        </Button>
        <Button colorScheme="blue">
          Recieve
        </Button>
      </HStack>
    }
    <Divider h={8} />
    <Box p={4}>

      <ContractStats />
      <ContractCode code={code} height="800px" />
    </Box>
    <MintFTModal {...MintProps}/>
    <TransferFTModal {...TransProps}/>
  </Container>
}


