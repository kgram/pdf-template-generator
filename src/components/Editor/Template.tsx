import { ReactNode } from 'react'
import { RenderElementProps, useSelected } from 'slate-react'

type Props = {
	attributes: RenderElementProps['attributes'],
	name: string,
	children?: ReactNode,
}

export const Template = ({ attributes, name, children }: Props) => {
	const isSelected = useSelected()

	return (
		<span
			{...attributes}
			style={{
				display: 'inline-block',
				backgroundColor: 'rgb(220, 230, 242)',
				outline: isSelected ? '1px solid rgb(128, 163, 217)' : undefined,
				padding: '0 8px',
				borderRadius: 8,
			}}
			data-template-id={name}
		>
			{children}
			{name}
		</span>
	)
}
