import { configureStore } from '@reduxjs/toolkit'
import auth from './auth/slice.ts'
import preferences from './preferences/slice.ts'

const store = configureStore({
	reducer: {
		auth,
		preferences,
	},
})

export default store

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
