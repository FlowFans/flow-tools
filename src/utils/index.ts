import * as fcl from "@onflow/fcl";
import { TxOpts } from "../constants/types";
import { createStandaloneToast } from "@chakra-ui/react";

import { ToastProps } from "../constants/types";

const toastStandalone = createStandaloneToast();

export const firstUpperCase = (str: string) => {
  return str.replace(/\b(\w)(\w*)/g, function ($0, $1, $2) {
    return $1.toUpperCase() + $2.toLowerCase();
  });
};

const isFungibleTokenContract = (code: string) => {
  const tokens = [
    ": FungibleToken {",
    "VaultStoragePath: StoragePath",
    "deposit(from: @FungibleToken.Vault) {",
    "withdraw(amount: UFix64): @FungibleToken.Vault {",
  ];
  let indexSum = 0;
  tokens.map((t) => {
    const idx = code.indexOf(t);
    indexSum += idx;
  });
  return indexSum > 0;
};
export const contractCodeType = (code: string): string => {
  let type = "none";
  if (isFungibleTokenContract(code)) {
    type = "FT";
  }
  return type;
};

const noop = async () => {};

export async function tx(mods: any[] = [], opts: TxOpts) {
  const onStart = opts.onStart || noop;
  const onSubmission = opts.onSubmission || noop;
  const onUpdate = opts.onUpdate || noop;
  const onSuccess = opts.onSuccess || noop;
  const onError = opts.onError || noop;
  const onComplete = opts.onComplete || noop;
  const env = await fcl.config().get("env");
  const txLink = (txId = "") => fvsTx(env, txId);
  try {
    onStart();
    var txId = await fcl.send(mods).then(fcl.decode);

    console.info(
      `%cTX[${txId}]: ${txLink(txId)}`,
      "color:purplefont-weight:boldfont-family:monospace"
    );
    onSubmission(txId);
    var unsub = await fcl.tx(txId).subscribe(onUpdate);
    var txStatus = await fcl.tx(txId).onceSealed();
    unsub();
    console.info(
      `%cTX[${txId}]: ${txLink(txId)}`,
      "color:greenfont-weight:boldfont-family:monospace"
    );
    await onSuccess(txStatus, txLink(txId));
    return txStatus;
  } catch (error) {
    console.error(`TX[${txId}]: ${txLink(txId)}`, error);
    onError(error, txLink(txId));
  } finally {
    await onComplete();
  }
}

export const fvsTx = (env: string, txId: string): string => {
  return `https://flow-view-source.com/${env}/tx/${txId}`;
};

export const toast = ({
  title = "Tips",
  desc = "",
  status = "success",
  duration = 9000,
  isClosable = true,
}: ToastProps) => {
  toastStandalone({
    position: "bottom-right",
    title,
    description: desc,
    status,
    duration,
    isClosable,
  });
};

export const fmtFlow = (balance: number) => {
  if (balance == null) return null;
  return String(Number(balance) / 100000000);
};

export const invariant = (fact:any, msg:any, ...rest:any) => {
  if (!fact) {
    const error:any = new Error(`INVARIANT ${msg}`)
    error.stack = error.stack
      .split("\n")
      .filter((d:any) => !/at invariant/.test(d))
      .join("\n")
    console.error("\n\n---\n\n", error, "\n\n", ...rest, "\n\n---\n\n")
    throw error
  }
}