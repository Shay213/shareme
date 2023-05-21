import { useQuery } from '@tanstack/react-query'
import newRequest from '../utils/newRequest'
import { MasonryLayout, Spinner } from '.'
import { DetailsPin, FeedPin } from '../interfaces'

const RelatedPins = ({ pin }: { pin: DetailsPin }) => {
	const { isLoading, isError, data } = useQuery<FeedPin[]>({
		queryKey: ['relatedPins', pin.id],
		queryFn: () =>
			newRequest.get(`pins/category/${pin.category}`).then((res) => res.data),
	})

	if (isLoading) return <Spinner message='Loading related pins...' />
	if (isError || data.length === 0)
		return (
			<h2 className='text-2x mb-4 mt-8 text-center font-bold'>
				No related pins found
			</h2>
		)
	console.log(data)
	return (
		<div>
			<h2 className='text-2x mb-4 mt-8 text-center font-bold'>
				More Like This
			</h2>
			<MasonryLayout pins={data} />
		</div>
	)
}

export default RelatedPins
