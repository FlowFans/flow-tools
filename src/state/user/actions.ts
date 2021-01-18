import { createAction } from '@reduxjs/toolkit'
import {UserInfo} from '../../constants/types'

export const updateTheme = createAction<{ theme: string }>('user/updateTheme')
export const updateUserInfo = createAction<{ userInfo: UserInfo }>('user/updateUserInfo')
