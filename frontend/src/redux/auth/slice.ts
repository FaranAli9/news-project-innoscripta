import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { User } from 'src/types/models/user'

const API_TOKEN = 'news_api_token'

// Define a type for the slice state
export interface AuthState {
	token: string | null
	user: User | null
}

// Define the initial state using that type
const initialState: AuthState = {
	token: localStorage.getItem(API_TOKEN)!,
	user: null,
}

export const authSlice = createSlice({
	name: 'counter',
	initialState,
	reducers: {
		setToken(state, action: PayloadAction<string | null>) {
			state.token = action.payload
			localStorage.setItem(API_TOKEN, action.payload!)
		},
		setUser(state, action: PayloadAction<User | null>) {
			state.user = action.payload
		},
		logout(state) {
			state.token = null
			state.user = null
			localStorage.removeItem(API_TOKEN)
		},
	},
})

export const { setToken, setUser, logout } = authSlice.actions

export default authSlice.reducer
