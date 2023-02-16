import { CSSProperties, ReactNode } from 'react'

export type ButtonType = 'solid' | 'outline'

type Props = {
	label: ReactNode,
	type?: ButtonType,
	disabled?: boolean,
	onClick?: () => void,
}

const commonStyle: CSSProperties = {
	padding: '8px 18px',
	borderRadius: 8,
	border: '2px solid',
	cursor: 'pointer',
	fontWeight: 700,
}

const disabledStyle: CSSProperties = {
	cursor: 'default',
	opacity: 0.6,
}

const getStyle = (type: ButtonType, disabled: boolean): CSSProperties => {
	switch (type) {
		case 'solid': return {
			...commonStyle,
			color: '#222730',
			backgroundColor: 'white',
			borderColor: 'white',
			...disabled ? disabledStyle : {},
		}
		case 'outline': return {
			...commonStyle,
			color: 'white',
			backgroundColor: 'transparent',
			borderColor: 'white',
			...disabled ? disabledStyle : {},
		}
	}
}

export const Button = ({ label, type = 'solid', disabled = false, onClick }: Props) => (
	<button onClick={onClick} style={getStyle(type, disabled)} disabled={disabled}>
		{label}
	</button>
)
