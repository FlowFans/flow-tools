import React, { useCallback, useEffect, useState } from "react";
import { Container, Box, Button } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";

import Cont from "../../components/Container";
import TokenQueryForm from "../../components/TokenQueryForm";

export default function FungibleTokens() {
  const history = useHistory()
  return (
    <Cont>
      <Container maxW='xl' centerContent>
        <Box p={4}>
        <TokenQueryForm type='nft' />
        </Box>
      </Container>
    </Cont>
  );
}
