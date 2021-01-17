import { createAction } from '@reduxjs/toolkit'
import {userInfo} from '../../constants/types'

export const updateTheme = createAction<{ theme: string }>('user/updateTheme')
export const updateUserInfo = createAction<{ userInfo: userInfo }>('user/updateUserInfo')
