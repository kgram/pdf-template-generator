import { CSSProperties, forwardRef, ReactNode } from 'react'

type Props = {
	children?: ReactNode,
	style?: CSSProperties,
}

export const Page = forwardRef<HTMLDivElement, Props>(({ children, style }, ref) => (
	<div ref={ref} className='page' style={{
		backgroundColor: '#FFF',
		color: '#000000',
		position: 'relative',
		width: '210mm',
		height: '297mm',
		padding: '2cm',
		boxShadow: '1px 1px 6px #00000040',
		display: 'flex',
		flexDirection: 'column',
		whiteSpace: 'pre-wrap',
		overflowWrap: 'break-word',
		...style
	}}>
		{children}
	</div>
))
