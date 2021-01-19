import React, { useCallback, useEffect, useState } from "react";
import {
  Container,
  Box,
  FormControl,
  Input,
  FormLabel,
  FormErrorMessage,
  Button,
  FormHelperText,
} from "@chakra-ui/react";

import Cont from "../../components/Container";
import FungibleTokenForm from '../../components/FungibleTokenForm'
import AccountInfo from '../../components/AccountInfo'
import {SubmitFunc} from '../../constants/types'
import {createFungibleToken} from '../../flow/createFungibleToken'

export default function FungibleTokenIssue() {

  const onSuccess = (status:any) => {
    console.log(status, '===========')
  }

  const onError = (error:any) => {
    console.log(error, '===========')
  }


  const handleSubmit:SubmitFunc = async (values, actions) => {
    actions.setSubmitting(true)
    console.log(values)
    const {contractName} = values
    const tx = await createFungibleToken(contractName, {onSuccess, onError})
    console.log(tx)
    actions.setSubmitting(false)
    actions.resetForm()
  }

  return (
    <Cont>
      <Container maxW='xl' centerContent>
        <Box p={4}>
          <FungibleTokenForm onSubmit={handleSubmit}/>
        </Box>
        <Box p={4}>
          <AccountInfo />
        </Box>
      </Container>
    </Cont>
  );
}
