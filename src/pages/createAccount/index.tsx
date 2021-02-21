import React, { useCallback, useEffect, useState } from 'react'
import { Container, Box, Button, Divider, Center, Text } from '@chakra-ui/react'
import Cont from '../../components/Container'
import { createFlowAccount } from '../../flow/accounts'

export default function CreateAccount() {
  const [accountInfo, setAccountInfo] = useState({})
  const [loading, setLoading] = useState(false)
  
  const handelCreate = async () => {
    const acc = await createFlowAccount()
    setLoading(true)
    console.log(acc)
    setAccountInfo(acc)
    setLoading(false)
  }

  return <Cont>
    <Center p={6}>
      <Button isLoading={loading} onClick={()=>handelCreate()}>Create Account</Button>
    </Center>
    <Divider />
    <Center p={6}>
      <Text as='pre'>
        {JSON.stringify(accountInfo)}
      </Text>
    </Center>
  </Cont>
}

