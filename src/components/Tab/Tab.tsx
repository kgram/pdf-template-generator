import { ReactNode } from 'react'

type Props = {
	title: ReactNode,
	disabled?: boolean,
	children?: ReactNode,
}

// Dummy component, props are handled by TabContainer
export const Tab = (props: Props) => null
