import { Link } from 'react-router-dom'

const NotFound = () => {
	return (
		<div className="tw-w-screen tw-h-screen tw-flex tw-justify-center tw-items-center tw-bg-blue-600 tw-text-white tw-flex-col tw-gap-5">
			<h1 className="tw-text-8xl">404</h1>
			<h1 className="tw-text-7xl">Page not found</h1>
			<Link to="/">Back to Home</Link>
		</div>
	)
}

export default NotFound
