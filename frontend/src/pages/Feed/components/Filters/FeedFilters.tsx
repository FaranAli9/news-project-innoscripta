import { Button, Input } from 'antd'
import { useState } from 'react'
import CategoryFilter from 'src/pages/Feed/components/Filters/CategoryFilter.tsx'
import SourceFilter from 'src/pages/Feed/components/Filters/SourceFilter.tsx'
import AuthorsFilter from 'src/pages/Feed/components/Filters/AuthorsFilter.tsx'
import DateRangeFilter from 'src/pages/Feed/components/Filters/DateRangeFilter.tsx'

const FeedFilters = ({ onSearch }: { onSearch: CallableFunction }) => {
	const [search, setSearch] = useState<string | null>(null)
	const [categories, setCategories] = useState<number[]>([])
	const [sources, setSources] = useState<number[]>([])
	const [authors, setAuthors] = useState<number[]>([])
	const [range, setRange] = useState<[string, string] | null>(null)

	const handleCategoriesSelection = (_categories: number[]) => {
		setCategories(_categories)
	}
	const handleSourcesSelection = (_sources: number[]) => {
		setSources(_sources)
	}
	const handleAuthorSelection = (_authors: number[]) => {
		setAuthors(_authors)
	}
	const handleDateRangeSelection = (_range: [string, string] | null) => {
		setRange(_range)
	}

	const handleSearch = () => {
		onSearch({ search, categories, sources, authors, range })
	}
	const handleReset = () => {
		setSearch(null)
		setCategories([])
		setSources([])
		setAuthors([])
		setRange(null)
	}
	return (
		<div className="tw-container tw- md:tw-mx-auto tw-flex tw-flex-col md:tw-flex-row tw-justify-between tw-gap-5 tw-py-5 tw-px-5">
			<div className="tw-flex-grow tw-grid md:tw-flex tw-flex-col md:tw-flex-row tw-gap-5 tw-items-center tw-flex-wrap">
				<div>
					<Input
						value={search!}
						placeholder="Search"
						onChange={(e) => setSearch(e.target.value)}
					/>
				</div>
				<CategoryFilter
					onChange={handleCategoriesSelection}
					categories={categories}
				/>
				<SourceFilter
					onChange={handleSourcesSelection}
					sources={sources}
				/>
				<AuthorsFilter
					onChange={handleAuthorSelection}
					authors={authors}
				/>
				<DateRangeFilter onChange={handleDateRangeSelection} />
			</div>
			<div className="tw-flex tw-flex-col md:tw-flex-row tw-gap-3">
				<Button
					type="primary"
					ghost
					danger
					onClick={handleReset}
				>
					Reset
				</Button>
				<Button
					type="primary"
					onClick={handleSearch}
				>
					Search
				</Button>
			</div>
		</div>
	)
}

export default FeedFilters
