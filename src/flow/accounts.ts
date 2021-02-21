import * as fcl from '@onflow/fcl'
import * as t from '@onflow/types'
import * as sdk from '@onflow/sdk'
import { Account } from '../constants/types'
import { SerializableParam } from 'recoil'
import { toast, invariant } from '../utils'
import { genKeys } from '../utils/crypto'
import { fetchAccount } from './fetchFlowInfo'
import { tx } from '../utils'
import { template as createAccount } from '@onflow/six-create-account'

export const createFlowAccount = async (opts = {}) => {
  const keys = await genKeys()

  //   const createScript = `
  //   transaction {
  //     let payer: AuthAccount
  //     prepare(payer: AuthAccount) {
  //       self.payer = payer
  //     }
  //     execute {
  //       let account = AuthAccount(payer: self.payer)
  //       account.addPublicKey("${keys.publicKey}".decodeHex())
  //     }
  //   }
  // `
  // const response = await tx(
  //   [
  //     fcl.transaction(createScript),
  //     fcl.proposer(fcl.authz),
  //     fcl.payer(fcl.authz),
  //     fcl.authorizations([fcl.authz]),
  //     fcl.limit(1000),
  //   ],
  //   opts,
  // )
  // const response = await fcl.send([
  //   createAccount({
  //     proposer: fcl.authz,
  //     authorization: fcl.authz,
  //     payer: fcl.authz,
  //     publicKeys: [keys.flowKey], // Public Keys as hex encoded string.
  //   }),
  // ])
  const response = await fcl.send([
    fcl.transaction`
      transaction(publicKey:String) {
        let payer: AuthAccount
        prepare(payer: AuthAccount) {
          self.payer = payer
        }
        execute {
          let account = AuthAccount(payer: self.payer)
          account.addPublicKey(publicKey.decodeHex())
        }
      }
    `,
    fcl.proposer(fcl.authz),
    fcl.authorizations([fcl.authz]),
    fcl.payer(fcl.authz),
    fcl.args([sdk.arg(keys.flowKey, t.String)]),
  ])

  console.log(JSON.stringify(response))
  const accountData = {
    publicKey: keys.publicKey,
    flowKey: keys.flowKey,
    privateKey: keys.privateKey,
  }
  console.log(accountData)

  const { events } = await fcl.tx(response).onceSealed()
  const accountCreatedEvent = events.find(
    (d: any) => d.type === 'flow.AccountCreated',
  )
  invariant(accountCreatedEvent, 'No flow.AccountCreated found', events)
  let addr = accountCreatedEvent.data.address
  // a standardized string format for addresses is coming soon
  // our aim is to make them as small as possible while making them unambiguous
  addr = addr.replace(/^0x/, '')
  invariant(addr, 'an address is required')

  const account = await fetchAccount(addr)
  const key = account.keys.find((d: any) => d.publicKey === keys.publicKey)
  invariant(
    key,
    'could not find provided public key in on-chain flow account keys',
  )

  return {
    addr,
    ...accountData,
    keyId: key.index,
  }
}
