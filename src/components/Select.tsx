import { ReactNode } from 'react'
import ChevronDownIcon from 'mdi-react/ChevronDownIcon'

type Props<T> = {
	value: T,
	options: Array<{ text: ReactNode, value: T }>,
	onChange: (value: T) => void,
}

export const Select = <T extends any>({ value, options, onChange }: Props<T>) => {
	const foundIndex = options.findIndex((option) => option.value === value)
	const selectedIndex = foundIndex === -1 ? 0 : foundIndex

	return (
		<div style={{ position: 'relative', color: '#222730', }}>
			<select
				value={selectedIndex}
				onChange={({ currentTarget }) => {
					onChange(options[parseInt(currentTarget.value, 10)].value)
				}}
				style={{
					padding: '8px 24px 8px 18px',
					borderRadius: 8,
					border: '2px solid',
					cursor: 'pointer',
					backgroundColor: 'white',
					borderColor: 'currentcolor',
					fontWeight: 700,
					appearance: 'none',
				}}
			>
				{options.map(({ text }, index) => (
					<option key={index} value={index}>{text}</option>
				))}
			</select>
			<ChevronDownIcon
				style={{
					position: 'absolute',
					top: 6,
					right: 6,
					pointerEvents: 'none',
				}}
			/>
		</div>
	)
}
