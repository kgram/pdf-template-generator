import { Context } from './Context'

export const getRelativeRect = (context: Context, contentRect: DOMRect) => (
	DOMRect.fromRect({
		x: contentRect.x - context.rect.x,
		y: contentRect.y - context.rect.y,
		width: contentRect.width,
		height: contentRect.height,
	})
)
