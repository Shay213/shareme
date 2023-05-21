import { FeedPin } from '../interfaces'
import { MdDownloadForOffline } from 'react-icons/md'
import { AiTwotoneDelete } from 'react-icons/ai'
import { BsFillArrowUpRightCircleFill } from 'react-icons/bs'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import getCurrUser from '../utils/getCurrUser'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import newRequest from '../utils/newRequest'
import getDownloadLink from '../utils/getDownloadLink'

const Pin = ({ pin }: { pin: FeedPin }) => {
	const navigate = useNavigate()
	const [postHovered, setPostHovered] = useState(false)
	const queryClient = useQueryClient()
	const user = getCurrUser()

	const alreadySaved = !!pin.savedBy.find((el) => el.id === user?.id)

	const mutation = useMutation({
		mutationFn: ({ pinId, userId }: { pinId: string; userId: string }) =>
			newRequest.patch(`/pins/${pinId}`, { userId }),
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ['feed'] }),
		onError: (err) => console.log(err),
	})

	const mutation2 = useMutation({
		mutationFn: (pinId: string) => newRequest.delete(`/pins/${pinId}`),
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ['feed'] }),
		onError: (err) => console.log(err),
	})

	const savePin = (id: string) => {
		if (!alreadySaved && user) {
			mutation.mutate({ pinId: id, userId: user.id })
		}
	}

	const deletePin = (id: string) => {
		mutation2.mutate(id)
	}

	return (
		<div className='m-2'>
			<div
				onMouseEnter={() => setPostHovered(true)}
				onMouseLeave={() => setPostHovered(false)}
				onClick={() => navigate(`/pin-detail/${pin.id}`)}
				className={`
          relative w-auto cursor-pointer overflow-hidden
          rounded-lg transition-all duration-500 ease-in-out hover:shadow-lg
        `}
			>
				<img
					src={pin.imagePath}
					alt='user-post'
					className='w-full rounded-lg'
				/>
				{postHovered && (
					<div className='absolute top-0 z-50 flex h-full w-full flex-col justify-between p-1 py-2 pr-2'>
						<div className='flex items-center justify-between'>
							<div className='flex gap-2'>
								<a
									href={`${getDownloadLink(pin.imagePath)}?dl=`}
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
							{alreadySaved ? (
								<button
									type='button'
									className={`
                    outlined-none rounded-3xl bg-red-500 px-5 py-1 
                    text-base font-bold text-white 
                    opacity-70 hover:opacity-100 hover:shadow-md
                  `}
								>
									{pin?.savedBy.length} Saved
								</button>
							) : (
								<button
									type='button'
									className={`
                    outlined-none rounded-3xl bg-red-500 px-5 py-1 
                    text-base font-bold text-white 
                    opacity-70 hover:opacity-100 hover:shadow-md
                  `}
									onClick={(e) => {
										e.stopPropagation()
										savePin(pin?.id)
									}}
								>
									Save
								</button>
							)}
						</div>
						<div className='flex w-full items-center justify-between gap-2'>
							{pin.destination && (
								<a
									href={pin.destination}
									target='_blank'
									rel='noreferrer'
									className={`
                    flex items-center gap-2 overflow-hidden rounded-full 
                    bg-white p-2 px-4 font-bold text-black 
                    opacity-70 hover:opacity-100 hover:shadow-md
                  `}
									onClick={(e) => e.stopPropagation()}
								>
									<BsFillArrowUpRightCircleFill />
									{pin?.destination}
								</a>
							)}
							{pin?.owner?.id === user?.id && (
								<button
									type='button'
									className={`
                    outlined-none text-dark rounded-3xl bg-white
                    p-2 text-base font-bold
                    opacity-70 hover:opacity-100 hover:shadow-md
                  `}
									onClick={(e) => {
										e.stopPropagation()
										deletePin(pin?.id)
									}}
								>
									<AiTwotoneDelete />
								</button>
							)}
						</div>
					</div>
				)}
			</div>
			<Link
				to={`/user-profile/${pin?.owner?.id}`}
				className='mt-2 flex items-center gap-2'
			>
				<img
					className='h-8 w-8 rounded-full object-cover'
					src={pin?.owner?.imagePath}
					alt='user-profile'
				/>
				<p className='font-semibold capitalize'>{pin?.owner?.userName}</p>
			</Link>
		</div>
	)
}

export default Pin
