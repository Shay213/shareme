import { Link, useParams } from 'react-router-dom'
import { User } from '../interfaces'
import { MdDownloadForOffline } from 'react-icons/md'
import { MasonryLayout, Spinner } from '.'
import { useState } from 'react'
import getDownloadLink from '../utils/getDownloadLink'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import newRequest from '../utils/newRequest'
import { DetailsPin } from '../interfaces'
import Comments from './Comments'
import RelatedPins from './RelatedPins'

interface NewComment {
	description: string
	ownerId: string
}

const PinDetail = ({ user }: { user: User | undefined }) => {
	const [comment, setComment] = useState('')
	const [addingComment, setAddingComment] = useState(false)
	const { pinId } = useParams()
	const queryClient = useQueryClient()

	const { isLoading, isError, data } = useQuery<DetailsPin>({
		queryKey: ['pin', pinId],
		queryFn: () => newRequest.get(`pins/${pinId}`).then((res) => res.data),
	})

	const mutation = useMutation({
		mutationFn: (c: NewComment) => newRequest.post(`comments/${pinId}`, c),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['comments', pinId] })
			setComment('')
			setAddingComment(false)
		},
	})

	if (isLoading) return <Spinner message='Loading pin...' />
	if (isError) return <p className='mt-10 text-center'>Something went wrong!</p>

	const addComment = () => {
		if (comment && user) {
			setAddingComment(true)
			mutation.mutate({ ownerId: user.id, description: comment })
		}
	}

	return (
		<>
			<div
				className='m-auto flex flex-col bg-white xl:flex-row'
				style={{ maxWidth: '1500px', borderRadius: '32px' }}
			>
				<div className='flex flex-initial items-center justify-center md:items-start'>
					<img
						src={data.imagePath}
						alt='user-post'
						className='rounded-b-lg rounded-t-3xl'
					/>
				</div>

				{/* DETAILS */}
				<div className='xl:min-w-620 w-full flex-1 p-5'>
					<div className='flex items-center justify-between'>
						<div className='flex items-center gap-2'>
							<a
								href={`${getDownloadLink(data.imagePath)}?dl=`}
								download
								onClick={(e) => e.stopPropagation()}
								className={`
								text-dark flex h-9 w-9 items-center justify-center 
								rounded-full bg-white text-xl opacity-75 
								outline-none hover:opacity-100 hover:shadow-md
              `}
							>
								<MdDownloadForOffline />
							</a>
						</div>
						<a href={data.destination} target='_blank' rel='noreferrer'>
							{data.destination}
						</a>
					</div>
					<div>
						<h1 className='break-word mt-3 text-4xl font-bold'>{data.title}</h1>
						<p className='mt-3'>{data.about}</p>
					</div>
					<Link
						to={`/user-profile/${data?.owner?.id}`}
						className='mt-5 flex items-center gap-2 rounded-lg bg-white'
					>
						<img
							className='h-8 w-8 rounded-full object-cover'
							src={data?.owner?.imagePath}
							alt='user-profile'
						/>
						<p className='font-semibold capitalize'>{data?.owner?.userName}</p>
					</Link>

					{/* COMMENTS */}
					<Comments pinId={data.id} />

					{/* ADD COMMENTS */}
					<div className='mt-6 flex flex-wrap items-center gap-3'>
						<Link to={`/user-profile/${user?.id}`}>
							<img
								className='h-8 w-8 cursor-pointer rounded-full object-cover'
								src={user?.imagePath}
								alt='user-profile'
							/>
						</Link>
						<input
							type='text'
							className={`
							flex-1 rounded-2xl border-2 border-gray-100 p-2 
							outline-none focus:border-gray-300
						`}
							placeholder='Add a comment'
							value={comment}
							onChange={(e) => setComment(e.target.value)}
						/>
						<button
							type='button'
							className={`
							rounded-full bg-red-500 px-6 py-2 
							text-base font-semibold text-white outline-none
						`}
							onClick={addComment}
						>
							{addingComment ? 'Posting the comment...' : 'Post'}
						</button>
					</div>
				</div>
			</div>
			{/* RELATED PINS */}
			<RelatedPins pin={data} />
		</>
	)
}

export default PinDetail
