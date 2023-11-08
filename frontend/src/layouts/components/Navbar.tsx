import { AnyAction, Dispatch } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from 'src/redux/auth/slice.ts'
import { Dropdown, MenuProps } from 'antd'
import { getUser } from 'src/redux/auth/selectors.ts'
import { Link } from 'react-router-dom'
import Logo from 'src/components/Logo.tsx'

const Navbar = () => {
	const dispatch: Dispatch<AnyAction> = useDispatch()
	const user = useSelector(getUser)
	const handleLogout = () => {
		dispatch(logout())
	}
	const items: MenuProps['items'] = [
		{
			label: <Link to="/settings/feed">Feed Settings</Link>,
			key: '0',
		},
		{
			label: <Link to="/settings/profile">Profile</Link>,
			key: '0',
		},
		{
			type: 'divider',
		},
		{
			label: <button onClick={handleLogout}>Logout</button>,
			key: '3',
		},
	]
	return (
		<nav className="tw-flex tw-justify-between tw-items-center tw-p-3 tw-bg-primary tw-text-white tw-sticky tw-top-0 tw-z-10">
			<div className="">
				<Logo className="tw-w-28" />
			</div>
			<Dropdown
				menu={{ items }}
				trigger={['click']}
			>
				<button onClick={(e) => e.preventDefault()}>
					<div className="tw-w-10 tw-h-10 tw-p-2 tw-bg-gray-900 tw-rounded-full tw-flex tw-justify-center tw-items-center">
						{user.initials}
					</div>
				</button>
			</Dropdown>
		</nav>
	)
}

export default Navbar
