import { Select, SelectProps } from 'antd'
import { useEffect, useState } from 'react'
import { api } from 'src/services/axios.ts'
import { ziggy } from 'src/services/ziggy.ts'
import CategoryType from 'src/types/models/category.ts'

const CategoryFilter = ({
	onChange,
	categories,
}: {
	onChange: CallableFunction
	categories: number[]
}) => {
	const [options, setOptions] = useState<SelectProps['options']>([])
	useEffect(() => {
		api.get(ziggy('lookups.categories')).then(({ data }) => {
			const opts = data.items.map((item: CategoryType) => ({
				label: item.name,
				value: item.id,
			}))
			setOptions(opts)
		})
	}, [])
	return (
		<Select
			mode="multiple"
			allowClear
			style={{ flex: 1, display: 'block' }}
			value={categories}
			placeholder="Categories"
			onChange={(o) => onChange(o)}
			options={options}
		/>
	)
}

export default CategoryFilter
