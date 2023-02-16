import { RenderElementProps } from 'slate-react'
import { Image } from './Image'
import { Template } from './Template'

export const renderElements = ({ element, attributes, children }: RenderElementProps) => {
	switch (element.type) {
		case 'block': return <div {...attributes}>{children}</div>
		case 'columns': return <div {...attributes} style={{ display: 'flex', alignItems: 'flex-end', gap: 8, justifyContent: 'space-between' }}>{children}</div>
		case 'paragraph': return <p {...attributes} style={{ margin: 0, fontSize: element.fontSize ? `${element.fontSize}pt` : undefined, textAlign: element.align }}>{children}</p>
		case 'title': switch (element.size) {
			case 4: return <h4 {...attributes}>{children}</h4>
			case 3: return <h3 {...attributes}>{children}</h3>
			case 2: return <h2 {...attributes}>{children}</h2>
			case 1:
			default: return <h1 {...attributes}>{children}</h1>
		}
		case 'image': return <Image attributes={attributes} {...element}>{children}</Image>
		case 'template': return <Template attributes={attributes} {...element}>{children}</Template>
	}
}
