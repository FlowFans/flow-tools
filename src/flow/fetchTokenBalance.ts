import {send, decode, script, args, arg, cdc} from "@onflow/fcl"
import {Address} from "@onflow/types"
import { getQueryTemplate } from '../cadance/fungibleToken'

export function fetchTokenBalance(address: string, contractName: string) {
  if (address == null) return Promise.resolve(false)
  const {getBalances} = getQueryTemplate(address, contractName)
  // prettier-ignore
  return send([
    script(getBalances()),
    args([
      arg(address, Address)
    ])
  ]).then(decode)
}
