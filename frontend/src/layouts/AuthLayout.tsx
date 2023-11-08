import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router'
import { isLoggedIn as isLoggedInSelector } from 'src/redux/auth/selectors'
import Navbar from 'src/layouts/components/Navbar.tsx'
import { ReactNode } from 'react'

const AuthLayout = (): ReactNode => {
	const isLoggedIn = useSelector(isLoggedInSelector)

	return isLoggedIn ? (
		<>
			<Navbar />
			<Outlet />
		</>
	) : (
		<Navigate
			to="/login"
			replace={true}
		/>
	)
}

export default AuthLayout
