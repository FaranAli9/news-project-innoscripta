import { useSelector } from 'react-redux'
import { Outlet } from 'react-router'
import { Navigate } from 'react-router-dom'
import { isLoggedIn as isLoggedInSelector } from 'src/redux/auth/selectors'
import Logo from 'src/components/Logo.tsx'

const GuestLayout = () => {
	const isLoggedIn = useSelector(isLoggedInSelector)

	return isLoggedIn ? (
		<Navigate
			to="/"
			replace={true}
		/>
	) : (
		<div className="tw-flex tw-flex-col md:tw-flex-row tw-min-h-screen">
			<div className="md:tw-flex-1 tw-flex tw-flex-col tw-justify-center tw-items-center tw-px-20 tw-py-4 tw-gap-10 tw-bg-cyan-600">
				<Logo className="tw-w-40 lg:tw-w-[30rem]" />
				<h1 className="tw-text-4xl tw-font-semibold tw-text-center tw-hidden md:tw-block">
					Stay Informed, Stay Inspired: Your Daily News Feed App!
				</h1>
			</div>
			<div className="md:tw-flex-[2] md:tw-flex md:tw-justify-center md:tw-items-center tw-py-10 tw-px-5">
				<Outlet />
			</div>
		</div>
	)
}

export default GuestLayout
