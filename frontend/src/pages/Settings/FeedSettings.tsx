import { Button, Form, notification } from 'antd'
import { api } from 'src/services/axios.ts'
import { ziggy } from 'src/services/ziggy.ts'
import { useErrors } from 'src/hooks/useErrors.ts'
import CategoryFilter from 'src/pages/Feed/components/Filters/CategoryFilter.tsx'
import { useEffect, useState } from 'react'
import SourceFilter from 'src/pages/Feed/components/Filters/SourceFilter.tsx'
import AuthorsFilter from 'src/pages/Feed/components/Filters/AuthorsFilter.tsx'
import { useLoaderData } from 'react-router-dom'
import { FeedPreferences } from 'src/types/models/feed.preferences.ts'
import { useDispatch } from 'react-redux'
import { setPreferences } from 'src/redux/preferences/slice.ts'

const FeedSettings = () => {
	const [notificationApi, contextHolder] = notification.useNotification()
	const errors = useErrors()
	const loaderData: FeedPreferences = useLoaderData() as FeedPreferences
	const [categories, setCategories] = useState<number[]>([])
	const [sources, setSources] = useState<number[]>([])
	const [authors, setAuthors] = useState<number[]>([])
	const dispatch = useDispatch()

	const handleSave = (data: unknown) => {
		api
			.post(ziggy('feed.preferences.update'), data)
			.then(() => {
				notificationApi.success({ message: 'Settings saved' })
				dispatch(setPreferences({ categories, sources, authors }))
			})
			.catch((error) => {
				errors.set(error.response.data.errors)
			})
	}

	useEffect(() => {
		setCategories(loaderData.categories)
		setAuthors(loaderData.authors)
		setSources(loaderData.sources)
	}, [loaderData])

	return (
		<>
			{contextHolder}
			<div>
				<Form
					layout="vertical"
					name="login-form"
					className="md:tw-w-96"
					initialValues={{}}
					onFinish={handleSave}
				>
					<Form.Item
						label="Categories"
						name="categories"
					>
						<CategoryFilter
							onChange={setCategories}
							categories={categories}
						/>
					</Form.Item>
					<Form.Item
						label="Authors"
						name="authors"
					>
						<AuthorsFilter
							onChange={setAuthors}
							authors={authors}
						/>
					</Form.Item>
					<Form.Item
						label="Sources"
						name="sources"
					>
						<SourceFilter
							onChange={setSources}
							sources={sources}
						/>
					</Form.Item>
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
export default FeedSettings
