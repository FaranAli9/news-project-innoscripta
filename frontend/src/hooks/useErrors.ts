import { useState } from 'react'

interface IErrors {
	[key: string]: string[]
}

export interface ErrorBag {
	set: CallableFunction
	has: CallableFunction
	get: CallableFunction
	clear: CallableFunction
}

const useErrors = (): ErrorBag => {
	const [errors, setErrors] = useState<IErrors>(() => ({}))

	return {
		set(newErrors: IErrors) {
			setErrors(() => newErrors)
		},

		get(key: string) {
			return errors[key]?.at(0)
		},
		has(key: string) {
			return Object.prototype.hasOwnProperty.call(errors, key)
		},

		clear(key: string) {
			setErrors((errorState) => {
				delete errorState[key]
				return { ...errorState }
			})
		},
	}
}

export { useErrors }
