import { useQuery } from '@tanstack/react-query'
import newRequest from '../utils/newRequest'
import { Spinner } from '.'
import { PinDetailComment } from '../interfaces'

const Comments = ({ pinId }: { pinId: string }) => {
	const { isLoading, isError, data } = useQuery<PinDetailComment[]>({
		queryKey: ['comments', pinId],
		queryFn: () => newRequest.get(`comments/${pinId}`).then((res) => res.data),
	})

	if (isLoading) return <Spinner message='Loading comments...' />
	if (isError) return <p>Something went wrong!</p>

	return (
		<>
			<h2 className='mt-5 text-2xl'>Comments</h2>
			<div className='max-h-370 overflow-y-auto'>
				{data.map((c) => (
					<div
						className='mt-5 flex items-center gap-2 rounded-lg bg-white'
						key={c.id}
					>
						<img
							src={c.owner?.imagePath}
							alt='user-profile'
							className='h-10 w-10 cursor-pointer rounded-full'
						/>
						<div className='flex flex-col'>
							<p className='font-bold'>{c.owner?.userName}</p>
							<p>{c.description}</p>
						</div>
					</div>
				))}
			</div>
		</>
	)
}

export default Comments
