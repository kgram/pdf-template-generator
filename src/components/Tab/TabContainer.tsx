import { ReactNode, Children, useState, isValidElement, ReactElement, ComponentProps } from 'react'
import { Button } from '../Button'
import { Tab } from './Tab'

type Props = {
	children?: ReactNode,
}

export const TabContainer = ({ children }: Props) => {
	const [selectedTabIndex, setSelectedTabIndex] = useState(0)
	const tabs = Children
		.toArray(children)
		.filter((child): child is ReactElement<ComponentProps<typeof Tab>> => (
			isValidElement(child) && child.type === Tab
		))

	return (
		<div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
			<div style={{ display: 'flex', gap: 8, borderBottom: '1px solid currentcolor', paddingBottom: 8 }}>
				{tabs.map(({ props }, index) => (
					<Button
						key={index}
						label={props.title}
						type={selectedTabIndex === index ? 'solid' : 'outline'}
						disabled={props.disabled}
						onClick={() => setSelectedTabIndex(index)}
					/>
				))}
			</div>
			<div style={{
				marginTop: 16,
				flexGrow: 1, display: 'flex', flexDirection: 'column'
			}}>
				{tabs[selectedTabIndex]?.props.children}
			</div>
		</div>
	)
}
