import { FeedPin } from '../interfaces'
import { MdDownloadForOffline } from 'react-icons/md'
import { AiTwotoneDelete } from 'react-icons/ai'
import { BsFillArrowUpRightCircleFill } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import getCurrUser from '../utils/getCurrUser'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import newRequest from '../utils/newRequest'

const Pin = ({ pin }: { pin: FeedPin }) => {
	const navigate = useNavigate()
	const [postHovered, setPostHovered] = useState(false)
	const queryClient = useQueryClient()
	const user = getCurrUser()

	const alreadySaved = !!pin.savedBy.find((el) => el.id === user?.id)

	const mutation = useMutation({
		mutationFn: ({ pinId, userId }: { pinId: string; userId: string }) =>
			newRequest.patch(`/pins/${pinId}`, { id: userId }),
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ['feed'] }),
		onError: (err) => console.log(err),
	})

	const savePin = (id: string) => {
		if (!alreadySaved && user) {
			mutation.mutate({ pinId: id, userId: user.id })
		}
	}

	return (
		<div className='m-2'>
			<div
				onMouseEnter={() => setPostHovered(true)}
				onMouseLeave={() => setPostHovered(false)}
				onClick={() => navigate(`/pin-detail/${pin.id}`)}
				className={`
          relative w-auto cursor-zoom-in overflow-hidden 
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
									href={`${pin.imagePath}?dl=`}
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
					</div>
				)}
			</div>
		</div>
	)
}

export default Pin
