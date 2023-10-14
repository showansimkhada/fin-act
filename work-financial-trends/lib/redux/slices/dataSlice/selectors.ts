/* Instruments */
import type { ReduxState } from '@/lib/redux'
import * as ls from 'local-storage'

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectUserName = (state: ReduxState) => state.userPage.username
export const selectLogPag = (state: ReduxState) => state.userPage.loginpage

export const lsUser = (state: ReduxState) => ls.get('username')
export const lsPage = (state: ReduxState) => ls.get('userpage')