import { Select, SelectProps } from 'antd'
import { useEffect, useState } from 'react'
import { api } from 'src/services/axios.ts'
import { ziggy } from 'src/services/ziggy.ts'
import SourceType from 'src/types/models/source.ts'

const SourceFilter = ({
	onChange,
	sources,
}: {
	onChange: CallableFunction
	sources: number[]
}) => {
	const [options, setOptions] = useState<SelectProps['options']>([])
	useEffect(() => {
		api.get(ziggy('lookups.sources')).then(({ data }) => {
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
			value={sources}
			placeholder="Sources"
			onChange={(o) => onChange(o)}
			options={options}
		/>
	)
}

export default SourceFilter
