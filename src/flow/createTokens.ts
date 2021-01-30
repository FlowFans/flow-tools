import * as fcl from "@onflow/fcl"
import * as sdk from "@onflow/sdk"
import * as t from "@onflow/types"
import {tx} from "../utils"
import { getTemplates as ftTemplates } from '../cadance/fungibleToken/contracts'
import { getTemplates as nftTemplates } from '../cadance/nonFungibleToken/contracts'


export function createFungibleToken(contractName:string, opts = {}) {
  if (contractName == null)
    throw new Error("createFungibleToken(contractName) -- contractName required")

    const deployScript = `
    transaction(code: String) {
        prepare(acct: AuthAccount) {
            acct.contracts.add(name: "${contractName}", code: code.decodeHex())
        }
    }
`
    const {fungibleTokenContractTemplate} = ftTemplates(contractName)
    const contractCode = fungibleTokenContractTemplate()
  // prettier-ignore
  return tx([
    fcl.transaction(deployScript),
    fcl.args([
    sdk.arg(Buffer.from(contractCode, "utf8").toString("hex"), t.String)
    ]),
    fcl.proposer(fcl.authz),
    fcl.payer(fcl.authz),
    fcl.authorizations([
      fcl.authz
    ]),
    fcl.limit(1000)
  ], opts)
}


export function createNonFungibleToken(contractName:string, opts = {}) {
  if (contractName == null)
    throw new Error("createNonFungibleToken(contractName) -- contractName required")

    const deployScript = `
    transaction(code: String) {
        prepare(acct: AuthAccount) {
            acct.contracts.add(name: "${contractName}", code: code.decodeHex())
        }
    }
`
    const {nonFungibleTokenContractTemplate} = nftTemplates(contractName)
    const contractCode = nonFungibleTokenContractTemplate()
  // prettier-ignore
  return tx([
    fcl.transaction(deployScript),
    fcl.args([
    sdk.arg(Buffer.from(contractCode, "utf8").toString("hex"), t.String)
    ]),
    fcl.proposer(fcl.authz),
    fcl.payer(fcl.authz),
    fcl.authorizations([
      fcl.authz
    ]),
    fcl.limit(1000)
  ], opts)
}