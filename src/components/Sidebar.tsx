import { useState } from 'react'
import { Document } from '../Document'
import { Button } from './Button'
import { Tab, TabContainer } from './Tab'

type Props = {
	document?: Document,
	data: Array<Array<string>>,
	onDataChange?: (values: Array<Array<string>>) => void
	onOpenPdf: () => void,
	onDownloadZip: () => void,
	onOpenFile: () => void,
	onSaveFile: () => void,
	onClearData: () => void,
}

const validateEntry = (templates: Array<string>, entry: Array<string>) => (
	entry.length === templates.length && entry.every((value) => value.length > 0)
)

export const Sidebar = ({ document, data, onDataChange, onOpenPdf, onDownloadZip, onOpenFile, onSaveFile, onClearData }: Props) => {
	const [internalValue, setInternalValue] = useState(() => data.map((entry) => entry.join(', ')).join('\n'))
	const [isValid, setIsValid] = useState(() => data.map(() => true))

	return (
		<div style={{ gridArea: 'sidebar', display: 'flex', flexDirection: 'column' }}>
			<TabContainer>
				<Tab title='File'>
					<div style={{ flexGrow: 1, display: 'flex', gap: 8, flexDirection: 'column' }}>
						<Button label='Open file' onClick={() => onOpenFile()} />
						<Button label='Save file' onClick={() => onSaveFile()} disabled={!document} />
						<p>Data is also saved locally in your browser as you type...</p>
						<hr />
						<Button label='Save PDF from first entry' onClick={() => onOpenPdf()} disabled={!document && data.length > 0} />
						<Button label='Save and zip all PDFs' onClick={() => onDownloadZip()} disabled={!document && data.length > 0} />
						<div style={{ flexGrow: 1 }} />
						<Button label='Clear data' onClick={() => onClearData()} disabled={!document} type='outline' />
					</div>
				</Tab>
				<Tab title={`Data (${data.length})`} disabled={!document}>
					{document && <div style={{ display: 'flex', flexGrow: 1, position: 'relative' }}>
						<div style={{ padding: '32px 8px 0', position: 'absolute' }}>
							{isValid.map((isValid, index) => (
								isValid
									? <div key={index} style={{ color: 'green' }}>{'✓'}</div>
									: <div key={index} style={{ color: 'red' }}>{'→'}</div>
							))}
						</div>

						<div style={{ position: 'absolute', padding: '12px 8px 4px 32px', color: 'black' }}><b>{document.templates?.join('; ')}</b></div>
						<textarea
							style={{
								padding: '32px 8px 8px 32px',
								flexGrow: 1,
								resize: 'none',
								fontFamily: 'inherit',
								border: 'none',
								borderRadius: 8,
							}}
							value={internalValue}
							onChange={({ currentTarget }) => {
								const value = currentTarget.value
								setInternalValue(value)
								const entries = value.trim().split('\n').map((line) => line.split(/\s*;\s*/g))
								setIsValid(entries.map((entry) => validateEntry(document.templates ?? [], entry)))
								onDataChange?.(entries.filter((entry) => validateEntry(document.templates ?? [], entry)))
							}}
						/>
					</div>}
				</Tab>
				<Tab title='About'>
					<p>Some text...</p>
					<h3>Subheader</h3>
					<p>Some more text...</p>
				</Tab>
			</TabContainer>
		</div>
	)
}
