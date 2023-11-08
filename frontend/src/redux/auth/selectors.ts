import { RootState } from '../store'
import { createSelector } from 'reselect'

const authState = (state: RootState) => state.auth

export const getToken = createSelector([authState], (auth) => auth.token)
export const getUser = createSelector([authState], (auth) => auth.user!)

export const isLoggedIn = createSelector([authState], (auth) => {
	return !!auth.token
})
