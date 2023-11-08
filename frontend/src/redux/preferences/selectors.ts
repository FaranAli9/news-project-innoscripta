import { RootState } from '../store'
import { createSelector } from 'reselect'

const preferencesState = (state: RootState) => state.preferences

export const getPreferences = createSelector(
	[preferencesState],
	(preferences) => ({ ...preferences }),
)
