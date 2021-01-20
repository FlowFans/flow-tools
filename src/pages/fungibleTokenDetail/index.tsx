import React, { useCallback, useEffect, useState } from "react";
import { useHistory, RouteComponentProps } from "react-router-dom";
import { Box, Button } from "@chakra-ui/react"

import Container from "../../components/Container";
import { setupAccountWithToken, isAccountSetup, getTotalSupply,fetchTokenBalance } from '../../flow/fungibleToken'
import { useCurrentUserAddr } from '../../hooks/useCurrentUser'

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

  const [hasSetup, setSetupState] = useState(false)

  useEffect(() => {
    const querySetupInfo = async () => {
      const res = await isAccountSetup(contractAddress, contractName, currentUserAddr)
      // const res = await getTotalSupply(contractAddress, contractName)
      setSetupState(res)
      if(res){
        const balance = await fetchTokenBalance(contractAddress, contractName, currentUserAddr)
        console.log(balance, '===== balance')
      }
    }
    querySetupInfo()
  }, [contractAddress, contractName, currentUserAddr, hasSetup])

  const setupAccount = async () => {
    const res = setupAccountWithToken(contractAddress, contractName, currentUserAddr)
    console.log(res, 'set result')
  }
  // useEffect(()=> {

  //  

  // },[contractAddress, contractName])


  return <Container>
    {hasSetup ?
      <Box>

      </Box> :
      <Box>
        <Button onClick={setupAccount}>Setup Account with {contractAddress}/{contractName}</Button>
      </Box>}
  </Container>;
}


