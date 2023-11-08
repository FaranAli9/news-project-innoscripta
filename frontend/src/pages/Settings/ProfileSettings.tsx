import { Button, Form, notification } from 'antd'
import { useErrors } from 'src/hooks/useErrors.ts'
import { useDispatch, useSelector } from 'react-redux'
import { getUser } from 'src/redux/auth/selectors.ts'
import { api } from 'src/services/axios.ts'
import { ziggy } from 'src/services/ziggy.ts'
import { User } from 'src/types/models/user.ts'
import { setUser } from 'src/redux/auth/slice.ts'
import UserFields from 'src/pages/Auth/components/UserFields.tsx'

const ProfileSettings = () => {
	const [notificationApi, contextHolder] = notification.useNotification()

	const dispatch = useDispatch()
	const handleSave = (data: User) => {
		api
			.post(ziggy('auth.profile.update'), data)
			.then(({ data }) => {
				dispatch(setUser(data.user))
				notificationApi.success({ message: 'Profile updated' })
			})
			.catch((error) => {
				errors.set(error.response.data.errors)
			})
	}
	const user = useSelector(getUser)
	const errors = useErrors()
	return (
		<>
			{contextHolder}
			<div>
				<Form
					layout="vertical"
					name="login-form"
					className="md:tw-w-96 tw-max-w-full"
					initialValues={{
						name: user.name,
						email: user.email,
					}}
					onFinish={handleSave}
				>
					<UserFields errors={errors} />
					<Form.Item>
						<Button
							style={{ width: '100%' }}
							type="primary"
							htmlType="submit"
						>
							Save
						</Button>
					</Form.Item>
				</Form>
			</div>
		</>
	)
}
export default ProfileSettings
