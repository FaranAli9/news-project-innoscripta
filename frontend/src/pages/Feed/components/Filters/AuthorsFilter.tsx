import { Select, SelectProps } from 'antd'
import { useEffect, useState } from 'react'
import { api } from 'src/services/axios.ts'
import { ziggy } from 'src/services/ziggy.ts'
import SourceType from 'src/types/models/source.ts'

const AuthorsFilter = ({
	onChange,
	authors,
}: {
	onChange: CallableFunction
	authors: number[]
}) => {
	const [options, setOptions] = useState<SelectProps['options']>([])
	useEffect(() => {
		api.get(ziggy('lookups.authors')).then(({ data }) => {
			const opts = data.items.map((item: SourceType) => ({
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
			placeholder="Select Authors"
			value={authors}
			onChange={(o) => onChange(o)}
			options={options}
		/>
	)
}

export default AuthorsFilter
