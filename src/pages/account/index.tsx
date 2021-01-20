import React, { useCallback, useEffect, useState } from 'react'
import { useHistory, RouteComponentProps } from "react-router-dom";

import Cont from "../../components/Container";
import {Avatar} from '@chakra-ui/react'

export default function Account(
  props: RouteComponentProps<{ address: string }>
) {
  const history = useHistory();
  const {
    match: {
      params: { address },
    },
  } = props;
  if (!address) {
    history.push(`/`);
  }
  return (
    <Cont>
    </Cont>
  )
}
