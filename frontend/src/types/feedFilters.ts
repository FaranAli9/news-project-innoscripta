type FeedFilters = {
	search: string | null
	categories: number[]
	authors: number[]
	sources: number[]
	range: [string, string] | null
}

export default FeedFilters
