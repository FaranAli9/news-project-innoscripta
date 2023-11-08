import { NavLink } from 'react-router-dom'
import { Outlet } from 'react-router'

const Settings = () => {
	return (
		<main className="tw-container tw-mx-auto tw-py-5 md:tw-py-10 tw-space-y-5">
			<h1 className=" tw-text-lg tw-text-center md:tw-text-left md:tw-text-4xl tw-font-semibold tw-bg-primary tw-text-white tw-px-3 tw-py-2">
				Settings
			</h1>
			<div className="tw-grid md:tw-grid-cols-4 tw-bg-gray-50">
				<div className="tw-border-r tw-border-gray-100 tw-flex md:tw-flex-col">
					<NavLink
						className={({ isActive }) =>
							`hover:tw-bg-primary hover:tw-text-white tw-px-3 tw-py-2 tw-flex-grow md:tw-flex-grow-0 tw-text-center md:tw-text-left tw-block ${
								isActive ? 'tw-bg-primary tw-text-white' : ''
							}`
						}
						to="feed"
					>
						Feed
					</NavLink>
					<NavLink
						className={({ isActive }) =>
							`hover:tw-bg-primary hover:tw-text-white tw-px-3 tw-py-2 tw-flex-grow md:tw-flex-grow-0 tw-text-center md:tw-text-left tw-block ${
								isActive ? 'tw-bg-primary tw-text-white' : ''
							}`
						}
						to="profile"
					>
						Profile
					</NavLink>
				</div>
				<div className="md:tw-col-span-3 tw-bg-gray-50 tw-px-3 tw-py-2">
					<Outlet />
				</div>
			</div>
		</main>
	)
}

export default Settings
