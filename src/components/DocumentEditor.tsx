import { forwardRef, SetStateAction } from 'react'

import { Document } from '../Document'

import { Editor } from './Editor'
import { Page } from './Page'

type Props = {
	value: Document,
	onChange?: (action: SetStateAction<Document>) => void,
}

export const DocumentEditor = forwardRef<HTMLDivElement, Props>(({ value, onChange }: Props, ref) => (
	<Page ref={ref} style={{
		fontFamily: `${value.defaults?.fontFamily ?? 'Helvetica'}`,
		fontSize: `${value.defaults?.fontSize ?? 10}pt`,
		paddingTop: value.margin.top,
		paddingBottom: value.margin.bottom,
		paddingLeft: value.margin.left,
		paddingRight: value.margin.right,
	}}>
		{value.header && (
			<div>
				<Editor
					value={value.header.content}
					onChange={(content) => {
						onChange?.((current) => ({
							...current,
							header: {
								...current.header!,
								content,
							},
						}))
					}}
				/>
			</div>
		)}
		<div style={{ flexGrow: 1 }}>
			<Editor
				value={value.content}
				onChange={(content) => {
					onChange?.((current) => ({
						...current,
						content,
					}))
				}}
			/>
		</div>
		{value.contentBlocks?.map(({ top, left, width, content }, index) => (
			<div key={index} style={{
				position: 'absolute',
				top,
				left,
				width,
			}}>
				<Editor
					value={content}
					onChange={(content) => {
						onChange?.((current) => ({
							...current,
							contentBlocks: current.contentBlocks!.map((other, otherIndex) => (
								index === otherIndex
									? { ...other, content }
									: other
							)),
						}))
					}}
				/>
			</div>
		))}
		{value.footer && (
			<div>
				<Editor
					value={value.footer.content}
					onChange={(content) => {
						onChange?.((current) => ({
							...current,
							footer: {
								...current.footer!,
								content,
							},
						}))
					}}
				/>
			</div>
		)}
	</Page>
))
