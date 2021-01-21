import React, { useCallback, useEffect, useState } from 'react'
import { useHistory, RouteComponentProps } from "react-router-dom";

import Cont from "../../components/Container";
import {useAccountInfo}from '../../hooks/useAccount'
import AccountInfo from '../../components/AccountInfo'

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
  const {accountInfo, status, refresh} = useAccountInfo(address)

  return (
    <Cont>
      <AccountInfo accountInfo={accountInfo}/>
    </Cont>
  )
}
