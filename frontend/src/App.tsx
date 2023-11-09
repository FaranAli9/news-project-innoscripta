import {
	createBrowserRouter,
	createRoutesFromElements,
	Navigate,
	Route,
	RouterProvider,
} from 'react-router-dom'
import 'src/css/tailwind.css'
import 'src/css/app.css'
import { authLayoutLoader } from './loaders/authLayoutLoader'
import AuthLayout from 'src/layouts/AuthLayout.tsx'
import Home from 'src/pages/Home.tsx'
import Settings from 'src/pages/Settings/Settings.tsx'
import GuestLayout from 'src/layouts/GuestLayout.tsx'
import Login from 'src/pages/Auth/Login.tsx'
import ProfileSettings from 'src/pages/Settings/ProfileSettings.tsx'
import FeedSettings from 'src/pages/Settings/FeedSettings.tsx'
import { feedPreferencesLoader } from 'src/loaders/feedPreferencesLoader.ts'
import Register from 'src/pages/Auth/Register.tsx'
import NotFound from 'src/pages/Errors/NotFound.tsx'

const router = createBrowserRouter(
	createRoutesFromElements(
		<>
			<Route
				element={<AuthLayout />}
				loader={authLayoutLoader}
			>
				<Route
					path="/"
					element={<Home />}
					loader={feedPreferencesLoader}
				></Route>
				<Route
					path="/settings"
					element={<Settings />}
				>
					<Route
						index
						element={
							<Navigate
								to="profile"
								replace
							/>
						}
					/>
					<Route
						path="profile"
						element={<ProfileSettings />}
					></Route>
					<Route
						path="feed"
						element={<FeedSettings />}
						loader={feedPreferencesLoader}
					></Route>
				</Route>
			</Route>
			<Route element={<GuestLayout />}>
				<Route
					path="/login"
					element={<Login />}
				></Route>
				<Route
					path="/register"
					element={<Register />}
				></Route>
			</Route>
			<Route
				path="*"
				element={<NotFound />}
			/>
		</>,
	),
)
function App() {
	return <RouterProvider router={router}></RouterProvider>
}

export default App
