import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { AppDispatch, AppState } from '../index'
import {
  updateTheme, updateUserInfo,
} from './actions'
import {UserInfo} from '../../constants/types'





export function useThemeManager(): [string | null, (t:string) => void] {
  const dispatch = useDispatch<AppDispatch>()
  const theme = useSelector<AppState, AppState['user']['theme']>(state => state.user.theme)

  const changeTheme = useCallback((theme: string) => {
    dispatch(updateTheme({theme}))
  }, [theme, dispatch])
  return [theme, changeTheme]
}



export function useUserInfo(): [UserInfo, (t:UserInfo) => void] {
  const dispatch = useDispatch<AppDispatch>()
  const userInfo = useSelector<AppState, AppState['user']['userInfo']>(state => state.user.userInfo)
  const setUser = useCallback((userInfo: {loggedIn: boolean}) => {
    dispatch(updateUserInfo({userInfo}))
  }, [userInfo, dispatch])
  return [userInfo , setUser]
}

