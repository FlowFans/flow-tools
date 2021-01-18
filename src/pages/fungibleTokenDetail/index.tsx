import React, { useCallback, useEffect, useState } from "react";
import { useHistory, RouteComponentProps } from "react-router-dom";

import Container from "../../components/Container";

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
  return <Container>
    
  </Container>;
}
