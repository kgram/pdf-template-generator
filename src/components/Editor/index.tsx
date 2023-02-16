import { useMemo } from 'react'
import { createEditor, Descendant } from 'slate'
import { withHistory } from 'slate-history'
import { Editable, Slate, withReact } from 'slate-react'

import { renderElements } from './renderElement'
import { renderLeaf } from './renderLeaf'
import { withElements } from './withElements'

type Props = {
	value: Array<Descendant>,
	onChange?: (content: Array<Descendant>) => void,
}

export const Editor = ({ value, onChange }: Props) => {
	const editor = useMemo(() => (
		withElements(withHistory(withReact(createEditor())))
	), [])

	return (
		<Slate
			editor={editor}
			value={value}
			onChange={(content) => {
				// Don't persist if only selection changed
				if (editor.operations.every(({ type }) => type === 'set_selection')) return

				onChange?.(content)
			}}
		>
		<Editable
			renderElement={renderElements}
			renderLeaf={renderLeaf}
		/>
		</Slate>
	)
}
