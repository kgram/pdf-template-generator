export const replaceTemplates = (element: HTMLElement, templateFields: Array<string>, templateData: Array<string>) => {
	const templates = Array.from<HTMLElement>(element.querySelectorAll('[data-template-id]'))
	templates.forEach((template) => {
		const templateId = template.dataset.templateId!
		const index = templateFields.indexOf(templateId)
		if (index === -1) {
			throw new Error(`Invalid template ID ${templateId}`)
		}
		const replacement = window.document.createElement('span')
		replacement.innerText = templateData[index]
		replacement.style.display = 'inline-block'
		template.replaceWith(replacement)
	})
}
