import * as fcl from "@onflow/fcl"
import { Account} from '../constants/types'
import {SerializableParam} from 'recoil'
export const fetchFlowBalance = (address: string) => {
  if (address == null) return Promise.resolve(null)
  return fcl.account(address).then((d:Account) => d.balance)
}

export const fetchAccount = (address: SerializableParam) => {
  if (address == null) return Promise.resolve(null)
  return fcl.account(address)
}