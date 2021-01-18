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

import {SubmitFunc} from '../../constants/types'

export default function FungibleTokenIssue() {

  const handleSubmit:SubmitFunc = async (values, actions) => {

  }

  return (
    <Cont>
      <Container maxW='xl' centerContent>
        <Box p={4}>
          <FungibleTokenForm onSubmit={handleSubmit}/>
        </Box>
      </Container>
    </Cont>
  );
}
