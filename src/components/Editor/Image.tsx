import { ReactNode } from 'react'
import { RenderElementProps, useSelected } from 'slate-react'

type Props = {
	attributes: RenderElementProps['attributes'],
	dataUri: string,
	width: number,
	height: number,
	children?: ReactNode,
}

export const Image = ({ attributes, dataUri, width, height, children }: Props) => {
	const isSelected = useSelected()

	return (
		<div {...attributes}>
			{children}
			<img alt='' src={dataUri} style={{
				width,
				height,
				outline: isSelected ? '1px solid rgb(128, 163, 217)' : undefined
			}} />
		</div>
	)
}
