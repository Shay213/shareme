import { useQuery } from '@tanstack/react-query'
import newRequest from '../utils/newRequest'
import { Spinner } from '.'

const RelatedPins = ({ pinId }: { pinId: string }) => {
	const { isLoading, isError, data } = useQuery({
		queryKey: ['relatedPins', pinId],
		queryFn: () => newRequest.get(''),
	})

	if (isLoading) return <Spinner message='Loading related pins...' />
	if (isError) return <p>No related pins found.</p>

	return <div>RelatedPins</div>
}

export default RelatedPins
