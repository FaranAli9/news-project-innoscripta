import { Button, Form, Input } from 'antd'
import { useDispatch } from 'react-redux'
import { useErrors } from 'src/hooks/useErrors'
import { setToken } from 'src/redux/auth/slice.ts'
import { api } from 'src/services/axios'
import { ziggy } from 'src/services/ziggy'
import { Link } from 'react-router-dom'

const Login = () => {
	const errors = useErrors()
	const dispatch = useDispatch()
	const handleLogin = (body: { email: string; password: string }) => {
		api
			.post(ziggy('auth.login'), body)
			.then(({ data }) => {
				const token = data.token
				dispatch(setToken(token))
			})
			.catch((error) => {
				errors.set(error.response.data.errors)
			})
	}
	return (
		<div className="tw-space-y-5">
			<h1 className="tw-text-xl tw-text-center">Login to existing account</h1>
			<Form
				layout="vertical"
				name="login-form"
				className="tw-max-w-full tw-w-96"
				initialValues={{}}
				onFinish={handleLogin}
			>
				<Form.Item
					label="Email"
					name="email"
					validateStatus={errors.has('email') ? 'error' : undefined}
					help={errors.get('email')}
				>
					<Input
						placeholder="admin@demo.com"
						type="email"
						autoComplete="email"
						status={errors.has('email') ? 'error' : undefined}
						onChange={() => errors.clear('email')}
						size="large"
					/>
				</Form.Item>
				<Form.Item
					label="Password"
					name="password"
					validateStatus={errors.has('password') ? 'error' : undefined}
					help={errors.get('password')}
				>
					<Input.Password
						autoComplete="current-password"
						placeholder="admin123"
						status={errors.has('password') ? 'error' : undefined}
						onChange={() => errors.clear('password')}
						size="large"
					/>
				</Form.Item>
				<Form.Item>
					<Button
						style={{ width: '100%' }}
						type="primary"
						htmlType="submit"
					>
						Login
					</Button>
				</Form.Item>
			</Form>
			<div className="">
				<span className="tw-mr-1">Don't have an account?</span>
				<Link
					to="/register"
					className="tw-text-blue-600"
				>
					Register
				</Link>
			</div>
		</div>
	)
}

export default Login
