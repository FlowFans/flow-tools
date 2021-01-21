import React, { useState } from "react";
import {
  Box,
  Center
} from "@chakra-ui/react";
import { CloseIcon } from '@chakra-ui/icons'

import Cont from "../../components/Container";
import FungibleTokenForm from '../../components/FungibleTokenForm'
import AccountInfo from '../../components/AccountInfo'
import {SubmitFuncType} from '../../constants/types'
import {createFungibleToken} from '../../flow/createFungibleToken'
import {useCurrentUser} from '../../hooks/useCurrentUser'
import {useAccountInfo} from '../../hooks/useAccount'

import {toast} from '../../utils'

export default function FungibleTokenIssue() {

  const [currentUser] = useCurrentUser()
  const {addr} = currentUser
  const {accountInfo, status, refresh} = useAccountInfo(addr)
  const [contractName, setContractName] = useState()
  const [txInfo, setTx] = useState()
  const [error, setError] = useState()
  if(!accountInfo) return null

  const onSuccess = (status:any) => {
    toast({
      title:`Contractdeplpoy success`,
      desc:` ${contractName} deployed in Tx ${txInfo}`
    })
    refresh()
  }

  const onError = (error:any) => {
    setError(error)
    toast({
      title:'Contract deploy error',
      desc:'trx error',
      status:'error'
    })
  }


  const handleSubmit:SubmitFuncType = async (values, actions) => {
    actions.setSubmitting(true)
    const {contractName} = values
    setContractName(contractName)
    const tx = await createFungibleToken(contractName, {onSuccess, onError})
    setTx(tx)
    actions.setSubmitting(false)
    actions.resetForm()
  }

  return (
    <Cont>
        <Box w="100%">
          <FungibleTokenForm onSubmit={handleSubmit}/>
        </Box>

        {error && <Center w="100%"  bg="tomato" h="100px">
          {error}
        </Center>}
        
        <Box w="100%">
          <AccountInfo accountInfo={accountInfo} />
        </Box>
    </Cont>
  );
}
