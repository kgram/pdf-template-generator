import jsPDF from 'jspdf'
import { Context } from './Context'
import { drawNode } from './drawNode'

export const drawElement = async (pdf: jsPDF, element: HTMLElement, manipulate?: (element: HTMLElement) => Promise<void>) => {
	const wrapper = document.createElement('div')
	wrapper.style.position = 'absolute'
	wrapper.style.top = '-10000px'
	wrapper.style.left = '-10000px'
	const clone = element.cloneNode(true) as HTMLElement
	wrapper.appendChild(clone)
	document.body.appendChild(wrapper)
	if (manipulate) {
		await manipulate(clone)
	}
	const context: Context = {
		rect: clone.getBoundingClientRect(),
	}
	try {
		await drawNode(pdf, context, clone)
	} finally {
		wrapper.remove()
	}
}
