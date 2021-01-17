import { createReducer, nanoid } from '@reduxjs/toolkit'
import { PopupContent, removePopup, updateBlockNumber, ApplicationModal, setOpenModal } from './actions'

type PopupList = Array<{ key: string; show: boolean; content: PopupContent; removeAfterMs: number | null }>

export interface ApplicationState {
  readonly blockNumber: { readonly [chainId: number]: number }
  readonly openModal: ApplicationModal | null
}

const initialState: ApplicationState = {
  blockNumber: {},
  openModal: null
}

export default createReducer(initialState, builder =>
  builder.addCase(setOpenModal, (state, action) => {
      state.openModal = action.payload
    })
)
