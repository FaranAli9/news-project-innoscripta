import { Form, Input } from 'antd'
import { ErrorBag } from 'src/hooks/useErrors.ts'

export interface IUserFields {
	name: string
	email: string
	password: string
	password_confirmation: string
}
const UserFields = ({ errors }: { errors: ErrorBag }) => {
	return (
		<>
			<Form.Item
				label="Name"
				name="name"
				validateStatus={errors.has('name') ? 'error' : undefined}
				help={errors.get('name')}
			>
				<Input
					autoComplete="name"
					status={errors.has('name') ? 'error' : undefined}
					onChange={() => errors.clear('name')}
					size="large"
				/>
			</Form.Item>
			<Form.Item
				label="Email"
				name="email"
				validateStatus={errors.has('email') ? 'error' : undefined}
				help={errors.get('email')}
			>
				<Input
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
					status={errors.has('password') ? 'error' : undefined}
					onChange={() => errors.clear('password')}
					size="large"
				/>
			</Form.Item>
			<Form.Item
				label="Confirm password"
				name="password_confirmation"
			>
				<Input.Password
					onChange={() => errors.clear('password')}
					size="large"
				/>
			</Form.Item>
		</>
	)
}
export default UserFields
