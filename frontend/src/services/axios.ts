import axios, { InternalAxiosRequestConfig } from 'axios'
import store from 'src/redux/store'

const api = axios.create({
	baseURL: import.meta.env.VITE_API_BASE_URL,
	headers: {
		Accept: 'application/json',
	},
})

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
	const token = store.getState().auth.token
	config.headers.Authorization = `Bearer ${token}`
	return config
})
export { api }
