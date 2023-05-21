import { AiOutlineLogout } from 'react-icons/ai'
import { MasonryLayout, Spinner } from '.'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import newRequest from '../utils/newRequest'
import { User } from '../interfaces'
import getCurrUser from '../utils/getCurrUser'

const randomImg =
	'https://source.unsplash.com/1600x900/?nature,photography,technology'

const activeBtnStyles =
	'bg-red-500 text-white font-bold p-2 rounded-full w-20 outline-none capitalize'
const notActiveBtnStyles =
	'bg-primary mr-4 text-black font-bold p-2 rounded-full w-20 outline-none capitalize'

enum PinsToSelect {
	CREATED = 'created',
	SAVED = 'saved',
}

const UserProfile = () => {
	const [activeBtn, setActiveBtn] = useState<PinsToSelect>(PinsToSelect.CREATED)
	const navigate = useNavigate()
	const { userId } = useParams()

	const currUser = getCurrUser()
	const { isLoading, isError, data, refetch } = useQuery<User>({
		queryKey: ['userProfile', userId],
		queryFn: () => newRequest.get(`users/${userId}`).then((res) => res.data),
	})

	useEffect(() => {
		refetch()
	}, [activeBtn])

	if (!currUser) {
		localStorage.clear()
		navigate('/login')
	}
	if (isLoading) return <Spinner message='Loading user...' />
	if (isError) return <p>User not found.</p>

	return (
		<div className='relative h-full items-center justify-center pb-2'>
			<div className='flex flex-col pb-5'>
				<div className='relative mb-7 flex flex-col'>
					<div className='flex flex-col items-center justify-center'>
						<img
							src={randomImg}
							alt='banner-pic'
							className='h-370 2xl:h-510 w-full object-cover shadow-lg'
						/>
						<img
							src={data?.imagePath}
							alt='user-pic'
							className='-mt-10 h-20 w-20 rounded-full object-cover shadow-xl'
						/>
						<h1 className='mt-3 text-center text-3xl font-bold'>
							{data?.userName}
						</h1>
						<div className='z-1 absolute right-0 top-0 p-2'>
							{userId === currUser?.id && <p>Logout</p>}
						</div>
					</div>
					<div className='my-7 text-center'>
						<button
							type='button'
							onClick={(e) => {
								setActiveBtn(PinsToSelect.CREATED)
							}}
							className={`${
								activeBtn === 'created' ? activeBtnStyles : notActiveBtnStyles
							}`}
						>
							{PinsToSelect.CREATED}
						</button>
						<button
							type='button'
							onClick={(e) => {
								setActiveBtn(PinsToSelect.SAVED)
							}}
							className={`${
								activeBtn === 'saved' ? activeBtnStyles : notActiveBtnStyles
							}`}
						>
							{PinsToSelect.SAVED}
						</button>
					</div>

					<div className='px-2'>
						{activeBtn === PinsToSelect.CREATED ? (
							data?.ownPins?.length ? (
								<MasonryLayout pins={data?.ownPins} />
							) : (
								<PinsNotFound message="You don't have any created pins." />
							)
						) : data?.savedPins?.length ? (
							<MasonryLayout pins={data?.savedPins} />
						) : (
							<PinsNotFound message="You don't have any saved pins." />
						)}
					</div>
				</div>
			</div>
		</div>
	)
}

function PinsNotFound({ message }: { message: string }) {
	return (
		<div className='mt-2 flex w-full items-center justify-center text-xl font-bold'>
			<p>{message}</p>
		</div>
	)
}

export default UserProfile
