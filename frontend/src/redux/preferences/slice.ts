import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// Define a type for the slice state
export interface PreferencesState {
	categories: number[]
	authors: number[]
	sources: number[]
}

// Define the initial state using that type
const initialState: PreferencesState = {
	categories: [],
	authors: [],
	sources: [],
}

export const preferencesSlice = createSlice({
	name: 'counter',
	initialState,
	reducers: {
		setPreferences(state, action: PayloadAction<Record<string, number[]>>) {
			Object.keys(action.payload).forEach((key: string) => {
				state[key as keyof PreferencesState] = action.payload[key]
				return
			})
		},
	},
})

export const { setPreferences } = preferencesSlice.actions

export default preferencesSlice.reducer
