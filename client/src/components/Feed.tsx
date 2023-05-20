import { useEffect, useState } from 'react'
import { Spinner, MasonryLayout } from '.'
import { useQuery } from '@tanstack/react-query'
import newRequest from '../utils/newRequest'
import { useParams } from 'react-router-dom'

const Feed = () => {
	const [loading, setLoading] = useState(false)
	const { categoryId } = useParams()

	const { data, refetch } = useQuery({
		queryKey: ['feed'],
		queryFn: () =>
			newRequest
				.get(`/pins${categoryId ? '/' + categoryId : ''}`)
				.then((res) => res.data),
	})

	useEffect(() => {
		setLoading(true)
		if (categoryId) {
			refetch().then(() => setLoading(false))
		}
	}, [categoryId])

	if (loading)
		return <Spinner message='We are adding new ideas to your feed!' />

	return <div>{data && <MasonryLayout pins={data} />}</div>
}

export default Feed
