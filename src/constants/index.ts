import { string } from "yup/lib/locale"

export const CONFIG = "temp"

export const LOADING = "LOADING"

// Exposed states of a Flow Transaction
export const IDLE = "IDLE"
export const PROCESSING = "PROCESSING"
export const SUCCESS = "SUCCESS"
export const ERROR = "ERROR"

// How long to pause on a success or error message
// before transitioning back to an IDLE state.
export const IDLE_DELAY = 1000

export const ADDR_REGEX = /^0x[a-fA-F0-9]{16}$/

export const NOOP = () => {}

export const MULTIAVATAR_URL = "https://api.multiavatar.com/"

// export const DEFAULT_TX_OPTS = {
//   onStart: NOOP,
//   onSubmission: NOOP,
//   onUpdate: NOOP,
//   onSuccess: (status: any) => {},
//   onError: (error: string) => {},
//   onComplete: NOOP,
// }

export const COLOR_TYPE: { [key: string]: string } = {
  FT: "purple",
  NFT: "orange",
  Other: "gray",
}

// FT contract resource paths
export const FT_PATHS :{ [key: string]: (str:string)=>string } = {
  'vaultStoragePath': name =>`/storage/${name}Vault`,
  'receiverPublicPath': name =>`/public/${name}Receiver`,
  'balancePublicPath': name =>`/public/${name}Balance`,
  'adminStoragePath': name =>`/storage/${name}Admin`
}