import store from 'src/redux/store'
import { api } from 'src/services/axios.ts'
import { ziggy } from 'src/services/ziggy.ts'
import { FeedPreferences } from 'src/types/models/feed.preferences.ts'
import { setPreferences } from 'src/redux/preferences/slice.ts'

export const feedPreferencesLoader = async () => {
	const token = store.getState().auth.token
	if (!token) {
		return null
	}

	return await api
		.get(ziggy('feed.preferences.get'))
		.then(({ data }) => {
			const preferences: FeedPreferences = data.preferences
			const { categories, authors, sources } = preferences
			store.dispatch(setPreferences({ categories, authors, sources }))
			return preferences
		})
		.catch(() => {
			return null
		})
}
