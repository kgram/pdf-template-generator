import { ReactNode } from 'react'

type Props = {
	children?: ReactNode,
}

export const Grid = ({ children }: Props) => (
	<div style={{
		width: '100vw',
		height: '100vh',
		display: 'grid',
		gridTemplate: '"header content" auto "sidebar content" 1fr / 420px 1fr',
		gap: 24,
		padding: 16,
	}}>
		{children}
	</div>
)
