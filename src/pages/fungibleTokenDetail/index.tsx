import React, { useCallback, useEffect, useState } from 'react'
import { Redirect, RouteComponentProps } from 'react-router-dom'

import Container from '../../components/Container'


export default function fungibleTokenDetail(props: RouteComponentProps<{ contractAddress: string; contractName: string }>) {

  const {
    match: {
      params: { contractAddress, contractName }
    }
  } = props
  if (!contractAddress && !contractName ) {
    return <Redirect to={`/ft`} />
  }
  return (
    <Container>
      
    </Container>
  )
}
