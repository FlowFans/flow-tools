import * as fcl from "@onflow/fcl"
import { Account} from '../constants/types'

export function fetchFlowBalance(address: string) {
  if (address == null) return Promise.resolve(null)
  return fcl.account(address).then((d:Account) => d.balance)
}
