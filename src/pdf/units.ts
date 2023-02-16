const pxToPtConstant = 72/96

export const pxToPt = (amount: number) => (
	amount * pxToPtConstant
)
