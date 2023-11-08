import { Button, Form } from 'antd'
import { useDispatch } from 'react-redux'
import { useErrors } from 'src/hooks/useErrors'
import { setToken } from 'src/redux/auth/slice.ts'
import { api } from 'src/services/axios'
import { ziggy } from 'src/services/ziggy'
import UserFields, {
	IUserFields,
} from 'src/pages/Auth/components/UserFields.tsx'
import { Link } from 'react-router-dom'

const Register = () => {
	const errors = useErrors()
	const dispatch = useDispatch()
	const handleRegister = (body: IUserFields) => {
		api
			.post(ziggy('auth.register'), body)
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
			<h1 className="tw-text-xl tw-text-center">Create new account</h1>
			<Form
				layout="vertical"
				name="register-form"
				className="tw-max-w-full tw-w-96"
				initialValues={{}}
				onFinish={handleRegister}
			>
				<UserFields errors={errors} />
				<Form.Item>
					<Button
						style={{ width: '100%' }}
						type="primary"
						htmlType="submit"
					>
						Register
					</Button>
				</Form.Item>
			</Form>
			<div className="">
				<span className="tw-mr-1">Already have an account?</span>
				<Link
					to="/login"
					className="tw-text-blue-600"
				>
					Login
				</Link>
			</div>
		</div>
	)
}

export default Register
