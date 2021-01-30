import {
  send,
  decode,
  script,
  args,
  arg,
  transaction,
  proposer,
  authz,
  payer,
  authorizations,
  limit,
} from "@onflow/fcl";
import { Address } from "@onflow/types";
import { getTransactions, getQueryTemplate } from "../cadance/fungibleToken";
import { tx } from "../utils";
import * as sdk from "@onflow/sdk";
import * as t from "@onflow/types";

export const setupAccountWithToken = (
  address: string,
  contractName: string,
  setupAddr: string,
  opts = {}
) => {
  if (!address || !contractName || !setupAddr) return Promise.resolve(false);
  const { setupAccount } = getTransactions(address, contractName);
  // prettier-ignore
  return tx([
    transaction(setupAccount()),
    proposer(authz),
    payer(authz),
    authorizations([
      authz
    ]),
    limit(1000)
  ], opts)
};

export const isAccountSetup = (
  address: string,
  contractName: string,
  setupAddr: string
) => {
  if (!address || !contractName || !setupAddr) return Promise.resolve(false);

  const { getTokenSetupInfo } = getQueryTemplate(address, contractName);

  return send([
    script(getTokenSetupInfo()),
    args([arg(setupAddr, Address)]),
  ]).then(decode);
};

export const getTotalSupply = (address: string, contractName: string) => {
  if (!address || !contractName) return Promise.resolve(false);

  const { getTotalSupply } = getQueryTemplate(address, contractName);

  return send([script(getTotalSupply())]).then(decode);
};

export const getBalance = (
  address: string,
  contractName: string,
  queryAddress?: string
) => {
  if (!address || !contractName) return Promise.resolve(false);
  const { getBalances } = getQueryTemplate(address, contractName);
  // prettier-ignore
  return send([
    script(getBalances()),
    args([
      arg(queryAddress? queryAddress: address, Address)
    ])
  ]).then(decode)
};

export const mintToken = (
  address: string,
  contractName: string,
  amount: number,
  recipient: string,
  opts = {}
) => {
  if (!address || !contractName) return Promise.resolve(false);
  if (amount <= 0 || !recipient) return Promise.resolve(false);

  const { mintToken } = getTransactions(address, contractName);

  return tx(
    [
      transaction(mintToken()),
      args([
        sdk.arg(String(recipient), t.Address),
        sdk.arg(amount.toFixed(8).toString(), t.UFix64),
      ]),
      proposer(authz),
      payer(authz),
      authorizations([authz]),
      limit(100),
    ],
    opts
  );
};

export const transferToken = (
  address: string,
  contractName: string,
  amount: number,
  to: string,
  opts = {}
) => {
  if (!address || !contractName) return Promise.resolve(false);
  if (amount <= 0 || !to) return Promise.resolve(false);

  const { transfer } = getTransactions(address, contractName);

  return tx(
    [
      transaction(transfer()),
      args([sdk.arg(amount.toFixed(8).toString(), t.UFix64), sdk.arg(String(to), t.Address)]),
      proposer(authz),
      payer(authz),
      authorizations([authz]),
      limit(100),
    ],
    opts
  );
};
