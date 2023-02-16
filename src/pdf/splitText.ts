// Inspired by: https://www.bennadel.com/blog/4310-detecting-rendered-line-breaks-in-a-text-node-in-javascript.htm
export const splitText = (textNode: Text) => {
	const textContent = textNode.textContent ?? ''
	const range = document.createRange()
	range.setStart(textNode, 0)

	const lines: Array<{ text: string, rect: DOMRect}> = []

	for (let index = 0; index < textContent.length; index++ ) {
		range.setEnd(textNode, index + 1)
		const rects = range.getClientRects()

		if (rects.length === 2) {
			lines.push({
				text: textContent.substring(range.startOffset, range.endOffset - 1).trim(),
				rect: rects[0],
			})
			range.setStart(textNode, index)
		}
	}
	lines.push({
		text: textContent.substring(range.startOffset).trim(),
		rect: range.getClientRects()[0],
	})

	return lines
}
