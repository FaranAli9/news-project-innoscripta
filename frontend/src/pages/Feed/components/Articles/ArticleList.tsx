import Article from './Article.tsx'
import ArticleType from 'src/types/models/article.ts'
import PropTypes from 'prop-types'
import { Fragment } from 'react'
const ArticleList = ({ articles }: { articles: ArticleType[] }) => {
	return (
		<main className="tw-flex tw-flex-col tw-gap-5 tw-py-10 tw-px-5 md:tw-w-[40rem] tw-max-w-full tw-mx-auto">
			{articles.map((article: ArticleType) => (
				<Fragment key={article.id}>
					<Article article={article} />
					<hr />
				</Fragment>
			))}
		</main>
	)
}

ArticleList.propTypes = {
	articles: PropTypes.array,
}

export default ArticleList
