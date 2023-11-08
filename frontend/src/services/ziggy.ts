import ziggyRouter from 'ziggy-js'

const config = await fetch(`${import.meta.env.VITE_API_BASE_URL}/ziggy`).then(
	(response) => response.json(),
)

export const ziggy = (
	name?: string,
	params?: Record<string, unknown>,
	absolute?: boolean,
): string => {
	return ziggyRouter(name!, params, absolute, config)
}
