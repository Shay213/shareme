import { FeedPin } from '../interfaces'
import Masonry from 'react-masonry-css'
import Pin from './Pin'

const breakPointObj = {
	default: 4,
	3000: 6,
	2000: 5,
	1200: 3,
	1000: 2,
	500: 1,
}

const MasonryLayout = ({ pins }: { pins: FeedPin[] }) => {
	return (
		<Masonry className='animate-slide-fwd flex' breakpointCols={breakPointObj}>
			{pins?.map((pin) => (
				<Pin key={pin.id} pin={pin} />
			))}
		</Masonry>
	)
}

export default MasonryLayout
