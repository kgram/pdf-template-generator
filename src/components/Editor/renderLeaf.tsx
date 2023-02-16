import { RenderLeafProps } from 'slate-react'

export const renderLeaf = ({ leaf: { bold, italic }, attributes, children }: RenderLeafProps) => {
	if (bold) {
		children = <strong>{children}</strong>
	}

	if (italic) {
		children = <em>{children}</em>
	}

	return <span {...attributes}>{children}</span>
}
