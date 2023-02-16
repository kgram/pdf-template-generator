import { Editor, Transforms } from 'slate'

export const withElements = (editor: Editor): Editor => {
	const { isVoid, markableVoid, isInline, insertData } = editor

	editor.markableVoid = (element) => {
		switch (element.type) {
			case 'template':
				return true

			default: return markableVoid(element)
		}
	}

	editor.isVoid = (element) => {
		switch (element.type) {
			case 'image':
			case 'template':
				return true

			default: return isVoid(element)
		}
	}
	editor.isInline = (element) => {
		switch (element.type) {
			case 'template':
				return true

			default: return isInline(element)
		}
	}
	editor.insertData = async (data) => {
		const { files } = data

		if (files && files.length > 0) {
			for (const file of Array.from(files)) {
				const [mime] = file.type.split('/')

				if (mime === 'image') {
					const dataUri = await readFile(file)
					const { width, height } = await getImageDimensions(dataUri)

					Transforms.insertNodes(editor, {
						type: 'image',
						dataUri,
						// Scale image to fit print
						width: width * 96 / 300,
						height: height * 96 / 300,
						children: [{ text: '' }],
					})
				}
			}
		} else {
			insertData(data)
		}
	}

	return editor
}

const readFile = (file: File) => new Promise<string>((resolve, reject) => {
	const reader = new FileReader()

	reader.addEventListener('load', () => {
		resolve(reader.result as string)
	})

	reader.addEventListener('error', (error) => {
		reject(error)
	})

	reader.readAsDataURL(file)
})

const getImageDimensions = (url: string) => new Promise<{ width: number, height: number }>((resolve, reject) => {
	const image = new Image()

	image.addEventListener('load', () => {
		resolve({ width: image.width, height: image.height })
	})

	image.addEventListener('error', (error) => {

	})

	image.src = url
})
