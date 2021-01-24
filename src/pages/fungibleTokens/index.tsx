import React, { useCallback, useEffect, useState } from "react";
import { Container, Box, Button, Divider } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";

import Cont from "../../components/Container";
import TokenQueryForm from "../../components/TokenQueryForm";

export default function FungibleTokens() {
  const history = useHistory()
  return (
    <Cont>
      <Container maxW='xl' centerContent>
        <Box p={4}>
          <Button
            size='md'
            height='48px'
            width='200px'
            border='2px'
            onClick={()=>history.push('ft/issue')}
          >
            Issues your token
          </Button>
          <Divider mb={4} mt={4} />
          <Button
            size='md'
            height='48px'
            width='200px'
            border='2px'
            onClick={()=>history.push('ft/query')}
          >
            Query token
          </Button>
          
        </Box>
      </Container>
    </Cont>
  );
}
