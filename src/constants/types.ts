export interface UserInfo {
    loggedIn: boolean
    addr:string
    cid: string

}

export interface SubmitFunc {
    (values: any, actions: any): void;
  }

export interface Key{
    hashAlgo:number
    index:number
    publicKey: string
    revoked: boolean
    weight:number
    signAlgo:number
    sequenceNumber: number
}
export interface Account {
    address: string
    balance: number
    code: string
    contracts?: any
    keys?:Key[]
}


export type TxOpts = {
    onStart?: Function
    onSubmission?: Function
    onUpdate?: Function
    onSuccess?: Function
    onError?: Function
    onComplete?: Function
}

export type toastStatus = "success" | "info" | "warning" | "error" | undefined

export interface ToastProps {
    title?: string
    desc: string
    status?:toastStatus
    duration?: number
    isClosable?:boolean
}

// export interface TX any[]