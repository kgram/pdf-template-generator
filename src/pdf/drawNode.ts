import { Canvg } from 'canvg'
import jsPDF from 'jspdf'
import { Context } from './Context'
import { getRelativeRect } from './getRelativeRect'
import { splitText } from './splitText'
import { pxToPt } from './units'

const getDataUriType = (url: string) => {
	const mediaType = url.substring(5, url.search(/(?:;base64),/))
	switch (mediaType) {
		case 'image/png': return 'PNG'
		case 'image/jpg': return 'JPG'
		case 'image/svg+xml': return 'SVG'
		default: return undefined
	}
}

const getHttpExtension = (url: string) => {
	const { pathname } = new URL(url)
	const periodPosition = pathname.lastIndexOf('.')
	if (periodPosition === -1) return undefined

	return pathname.substring(periodPosition + 1).toUpperCase()
}

const getImageType = (url: string) => {
	if (url.startsWith('http:')) return getHttpExtension(url)
	if (url.startsWith('https:')) return getHttpExtension(url)
	if (url.startsWith('data:')) return getDataUriType(url)
}

const scaleForPrint = (px: number) => px * 600 / 96

export const drawNode = async (pdf: jsPDF, context: Context, node: Node): Promise<void> => {
	if (node instanceof HTMLImageElement) {
		const position = getRelativeRect(context, node.getBoundingClientRect())
		const type = getImageType(node.currentSrc)
		const { x, y, width, height } = position
		switch (type) {
			case 'PNG': {
				pdf.addImage(node, 'PNG', pxToPt(x), pxToPt(y), pxToPt(width), pxToPt(height))
				break
			}
			case 'JPG': {
				pdf.addImage(node, 'JPG', pxToPt(x), pxToPt(y), pxToPt(width), pxToPt(height))
				break
			}
			case 'SVG': {
				const canvas = document.createElement('canvas')
				canvas.width = scaleForPrint(width)
				canvas.height = scaleForPrint(height)
				const context = canvas.getContext('2d')!
				const canvg = await Canvg.from(context, node.currentSrc, {
					ignoreDimensions: true,
				})
				canvg.resize(canvas.width, canvas.height, 'xMidYMid meet')
				await canvg.render()

				pdf.addImage(canvas, 'PNG', pxToPt(x), pxToPt(y), pxToPt(width), pxToPt(height))
			}
		}
	} else if (node instanceof Element) {
		await Promise.all(Array.from(node.childNodes).map((child) => (
			drawNode(pdf, context, child)
		)))
	} else if (node instanceof Text) {
		const {
			fontFamily,
			fontStyle,
			fontWeight,
			fontSize,
		} = getComputedStyle(node.parentElement!)
		pdf.setFont(fontFamily.split(',')[0], fontStyle, parseInt(fontWeight, 10))
		pdf.setFontSize(pxToPt(parseFloat(fontSize)))

		splitText(node).forEach(({ text, rect }) => {
			const { x, y, height } = getRelativeRect(context, rect)

			pdf.text(text, pxToPt(x), pxToPt(y + height))
		})
	}
}
