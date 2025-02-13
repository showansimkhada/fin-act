import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

const initialState: DataSliceState = {
  username: '',
  // loginpage: '',
  status: 'signedOut'
}

export interface DataSliceState {
  username: string,
  // loginpage: string,
  status: 'signedOut' | 'signedIn'
}

export const dataSlice = createSlice({
  name: 'userpage',
  initialState,
  reducers: {
    setUserName: (state, action: PayloadAction<string>) => {
      state.status = 'signedIn'
      state.username = action.payload
      localStorage.setItem('username', action.payload)
    },
    // setLogPag: (state, action: PayloadAction<string>) => {
    //   state.status = 'signedIn'
    //   state.loginpage = action.payload
    //   localStorage.setItem('userpage', action.payload)
    // },
    clearLS: (state) => {
      state.status = 'signedOut'
      localStorage.clear()
    }
  },
})