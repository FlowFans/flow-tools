import * as fcl from "@onflow/fcl"
import { Account} from '../constants/types'
import {SerializableParam} from 'recoil'
import {toast} from '../utils'

export const fetchFlowBalance = (address: string) => {
  if (address == null) return Promise.resolve(null)
  return fcl.account(address).then((d:Account) => d.balance)
}

export const fetchAccount = (address: SerializableParam) => {
  try {
    if (address == null) return Promise.resolve(null)
    return fcl.account(address)
  } catch (error) {
    console.log(error)
    toast({
      title: error,
      desc:`$error`
    })
    return ''
  }
}