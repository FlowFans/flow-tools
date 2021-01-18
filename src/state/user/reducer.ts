import { createReducer } from '@reduxjs/toolkit'
import { updateVersion } from '../global/actions'
import {
  updateTheme,
  updateUserInfo
} from './actions'
import {UserInfo} from '../../constants/types'


const currentTimestamp = () => new Date().getTime()


export interface UserState {
  theme: string  // the user's choice for dark mode or light mode
  userInfo: UserInfo 
  timestamp: number
}


export const initialState: UserState = {
  theme: '',
  userInfo: {loggedIn: false},
  timestamp: currentTimestamp()
}

export default createReducer(initialState, builder =>
  builder
    .addCase(updateVersion, state => {

    })
    .addCase(updateTheme, (state, action) => {
      state.theme = action.payload.theme
      state.timestamp = currentTimestamp()
    }).addCase(updateUserInfo, (state, action) => {
      state.userInfo = action.payload.userInfo
      state.timestamp = currentTimestamp()
    })

)
