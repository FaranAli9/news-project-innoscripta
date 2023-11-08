import ArticleList from 'src/pages/Feed/components/Articles/ArticleList.tsx'
import { api } from 'src/services/axios.ts'
import { ziggy } from 'src/services/ziggy.ts'
import { useEffect, useState } from 'react'
import Article from 'src/types/models/article.ts'
import FeedFilters from 'src/pages/Feed/components/Filters/FeedFilters.tsx'
import FeedFilterType from 'src/types/feedFilters.ts'
import { Button } from 'antd'
import NoArticlesFound from 'src/pages/Feed/components/NoArticlesFound.tsx'
import { useLoaderData } from 'react-router-dom'
import { FeedPreferences } from 'src/types/models/feed.preferences.ts'

const Feed = () => {
	const [articles, setArticles] = useState<Article[]>(() => [])
	const [loading, setLoading] = useState<boolean>(false)
	const [filters, setFilters] = useState<FeedFilterType>({
		search: null,
		categories: [],
		authors: [],
		sources: [],
	})
	const [page, setPage] = useState<number>(1)
	const defaultPreferences = useLoaderData() as FeedPreferences

	const handleFiltersChanged = (_filters: FeedFilterType) => {
		setPage(1)
		setFilters({ ..._filters })
	}
	const get = () => {
		if (page === 0) {
			return
		}
		if (page === 1) {
			setArticles([])
		}
		setLoading(true)
		const categories = [...filters.categories, ...defaultPreferences.categories]
		const authors = [...filters.authors, ...defaultPreferences.authors]
		const sources = [...filters.sources, ...defaultPreferences.sources]
		api
			.get(ziggy('feed.index', { categories, authors, sources, page }))
			.then(({ data }) => {
				const _paginator = data.articles
				setArticles((_articles) =>
					Array.from(new Set([..._articles, ..._paginator.data])),
				)
				setPage(
					_paginator.current_page >= _paginator.last_page
						? 0
						: _paginator.current_page,
				)
			})
			.finally(() => {
				setLoading(false)
			})
	}
	useEffect(get, [filters, page])
	return (
		<>
			<FeedFilters onSearch={handleFiltersChanged} />
			{articles.length ? (
				<ArticleList articles={articles} />
			) : !loading ? (
				<NoArticlesFound />
			) : null}
			{page > 0 && !loading && (
				<div className="tw-flex tw-justify-center tw-mb-20">
					<Button
						onClick={() => {
							setPage((p) => p + 1)
						}}
					>
						Load more
					</Button>
				</div>
			)}
		</>
	)
}

export default Feed
