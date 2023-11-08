import ArticleType from 'src/types/models/article.ts'
import { Button, Divider } from 'antd'
import * as days from 'dayjs'

const Article = ({ article }: { article: ArticleType }) => {
	return (
		<article className="tw-border tw-border-gray-200 tw-rounded tw-space-y-3">
			<img
				src={
					article.image || `https://picsum.photos/600/400?random=${article.id}`
				}
				className="tw-w-full"
				alt=""
			/>
			<div className="tw-p-3 tw-space-y-3">
				<h2 className=" tw-text-lg md:tw-text-4xl tw-font-bold tw-text-gray-900">
					{article.title}
				</h2>
				<p className="tw-text-gray-400 tw-text-sm md:tw-text-base">
					{article.summary}
				</p>
				<div className="tw-py-3">
					<Button
						type="primary"
						size="large"
						href={article.link}
						target="_blank"
					>
						Read more
					</Button>
				</div>
			</div>
			<div className="tw-px-3 tw-py-2 tw-border-t tw-border-gray-200">
				<div className="tw-flex tw-items-center tw-gap-2">
					<h3 className="tw-text-gray-500 tw-text-xs md:tw-text-sm">
						By {article.author.name} - {article.source.name}
					</h3>
					<Divider type="vertical" />
					<div className="tw-py-1 tw-px-2 tw-border tw-border-gray-400 tw-rounded tw-text-xs">
						{article.category.name}
					</div>
					<Divider type="vertical" />
					<div className="tw-text-xs tw-text-gray-500">
						{days(article.published_at).format('DD MMM YYYY')}
					</div>
				</div>
			</div>
		</article>
	)
}

export default Article
