const scaleForPrint = (px: number) => px * 300 / 96

export const imageToCanvas = (image: HTMLImageElement, { width: targetWidth, height: targetHeight }: DOMRect) => new Promise<string>((resolve) => {
	image.addEventListener('load', () => {
		const canvas = document.createElement('canvas')
		canvas.width = scaleForPrint(targetWidth)
		canvas.height = scaleForPrint(targetHeight)
		const context = canvas.getContext('2d')!
		console.log(`drawing ${image.width}x${image.height} to ${canvas.width}x${canvas.height}`)
		context.drawImage(image, 0, 0, image.width, image.height, 0, 0, canvas.width, canvas.height)

		resolve(canvas.toDataURL('image/png'))
	})
})
