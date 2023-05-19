import { useState } from 'react'
import { Spinner, MasonryLayout } from '.'
import { useQuery } from '@tanstack/react-query'
import newRequest from '../utils/newRequest'
import { useParams } from 'react-router-dom'

const Feed = () => {
	const [loading, setLoading] = useState(false)
	const { categoryId } = useParams()

	const { data, refetch } = useQuery({
		queryKey: ['feed'],
		queryFn: () => newRequest.get('/test'),
	})

	if (loading)
		return <Spinner message='We are adding new ideas to your feed!' />

	return <div>Feed</div>
}

export default Feed
