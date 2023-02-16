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
					<p>This is intended for generating sets of PDF-files with injected values. The original purpose was to generate certificate documents to a list of course participants.</p>
					<p>Since this was made for a single purpose, it's not really made for starting from scratch. To get started, you will need a JSON-file <a href='https://github.com/kgram/pdf-template-generator/blob/main/src/Document.ts'>conforming to the type described here</a>.</p>
					<p>If you're less technically inclined and would like help, or if proper support for some feature could help you, feel free to <a href='https://github.com/kgram/pdf-template-generator/issues/new'>create an issue</a>.</p>
					<p>The document will define a number of fields that should be usable as template-fields. In the data-tab, you can input the entries needed. They should be written as semicolon-separated values.</p>
					<p>There's lots of open ends currently, which could be fixed if needed:</p>
					<ul>
						<li>PDFs can only contain text and images, no borders, background-colors or anything like that</li>
						<li>PDF names cannot be controlled</li>
						<li>There are no rich-text controls (although it's supported if present in the template file)</li>
						<li>There are no controls for setting up the document</li>
					</ul>
				</Tab>
			</TabContainer>
		</div>
	)
}
