import { Descendant } from 'slate'

export type Document = {
	margin: {
		left: string,
		right: string,
		top: string,
		bottom: string,
	},
	content: Array<Descendant>,
	header?: {
		content: Array<Descendant>,
	},
	footer?: {
		content: Array<Descendant>,
	},

	contentBlocks?: Array<{
		top: number,
		left: number,
		width: number,
		content: Array<Descendant>,
	}>,

	templates?: Array<string>,

	defaults?: {
		fontFamily?: string,
		fontSize?: number,
	},
	fonts: Record<string, {
		normal: string,
		italic: string,
		bold: string,
		boldItalic: string,
	}>,
}
