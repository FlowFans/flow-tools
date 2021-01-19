import {useEffect} from "react"
import {atom, useRecoilState, SetterOrUpdater} from "recoil"
import * as fcl from "@onflow/fcl"
import {UserInfo, Account} from '../constants/types'

export const currentUser = atom({
  key: "CURRENT_USER",
  default: {addr: '', loggedIn: false, cid: ''},
})

const tools = {
  logIn: fcl.logIn,
  logOut: fcl.unauthenticate,
  signUp: fcl.signUp,
  changeUser: fcl.reauthenticate,
}

export function useCurrentUser():[UserInfo, boolean, any ] {
  const [user, setUser] = useRecoilState(currentUser)
  useEffect(() => fcl.currentUser().subscribe(setUser), [setUser])
  return [user, user.addr != null, tools]
}


