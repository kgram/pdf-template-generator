import { Select } from './Select'

type Props = {
	zoom: number,
	onSetZoom: (zoom: number) => void,
}

const zoomOptions = [
	2,
	1.5,
	1,
	0.9,
	0.8,
	0.7,
	0.6,
	0.5,
].map((value) => ({
	value,
	text: (value * 100).toFixed(0) + '%',
}))

export const BottomToolbar = ({ zoom, onSetZoom }: Props) => (
	<footer style={{ position: 'absolute', bottom: 32, right: 32 }}>
		<Select
			value={zoom}
			onChange={onSetZoom}
			options={zoomOptions}
		/>
	</footer>
)
