import { DatePicker } from 'antd'
import * as days from 'dayjs'
const { RangePicker } = DatePicker
const DateRangeFilter = ({ onChange }: { onChange: CallableFunction }) => {
	const handleOnChange = (range: unknown) => {
		let value = null
		if (Array.isArray(range)) {
			value = range.map((d) => d.format('YYYY-MM-DD'))
		}
		onChange(value)
	}
	return (
		<div>
			<RangePicker
				style={{ width: '100%' }}
				disabledDate={(c) => c > days().endOf('day')}
				onChange={handleOnChange}
			/>
		</div>
	)
}

export default DateRangeFilter
