import { ReactNode } from 'react'

type Props = {
	zoom: number,
	children?: ReactNode,
}

export const Content = ({ zoom, children }: Props) => (
	<div style={{
		gridArea: 'content',
		backgroundColor: '#EEEEFF',
		overflow: 'scroll',
		padding: 120,
	}}>
		<div style={{
			position: 'relative',
			width: `${210 * zoom}mm`,
			height: `${297 * zoom}mm`,
			margin: '0 auto',
			transition: 'width 0.2s, height 0.2s',
		}}>
			<div style={{
				position: 'absolute',
				transform: `scale(${zoom})`,
				transformOrigin: 'top left',
				transition: 'transform 0.2s',
			}}>
				{children}
			</div>
		</div>
	</div>
)
