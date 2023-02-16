export type TextNode = {
	text: string,
	bold?: boolean,
	italic?: boolean,
}

export type BlockElement =
| { type: 'block', children: Array<BlockElement> }
| { type: 'columns', children: Array<BlockElement> }
| { type: 'paragraph', children: Array<InlineElement | TextNode>, align?: 'left' | 'center' | 'right', fontSize?: number }
| { type: 'title', children: Array<InlineElement | TextNode>, size: 1 | 2 | 3 | 4, align?: 'left' | 'center' | 'right' }
| { type: 'image', children: [{ text: '' }], dataUri: string, width: number, height: number }

export type InlineElement =
| { type: 'template', children: [{ text: '' }], name: string }

export type Element =
| BlockElement
| InlineElement
