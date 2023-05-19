import { useState } from 'react'
import { Spinner, MasonryLayout } from '.'

const Feed = () => {
	const [loading, setLoading] = useState(true)

	if (loading)
		return <Spinner message='We are adding new ideas to your feed!' />

	return <div>Feed</div>
}

export default Feed
