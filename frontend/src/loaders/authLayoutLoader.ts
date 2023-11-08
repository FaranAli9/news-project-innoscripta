import { logout, setUser } from 'src/redux/auth/slice.ts'
import store from 'src/redux/store'
import { User } from 'src/types/models/user'
import { api } from 'src/services/axios.ts'
import { ziggy } from 'src/services/ziggy.ts'

export const authLayoutLoader = async () => {
	const token = store.getState().auth.token
	if (!token) {
		return null
	}
	return await api
		.get(ziggy('auth.profile.get'))
		.then(({ data }) => {
			const user: User = data.user
			store.dispatch(setUser(user))
			return null
		})
		.catch(() => {
			store.dispatch(logout())
			return null
		})
}
