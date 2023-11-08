import Author from './author.ts'
import Category from './category.ts'
import Source from './source.ts'

type Article = {
	id: bigint
	title: string
	summary: string
	link: string
	image: string
	published_at: string
	author: Author
	category: Category
	source: Source
}

export default Article
