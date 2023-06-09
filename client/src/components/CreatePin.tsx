import { Pin, User } from '../interfaces'
import { AiOutlineCloudUpload } from 'react-icons/ai'
import { MdDelete } from 'react-icons/md'
import { Spinner } from '.'
import { ChangeEventHandler, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import newRequest from '../utils/newRequest'
import { CATEGORIES } from '../utils/data'

const CreatePin = ({ user }: { user: User | undefined }) => {
	const [title, setTitle] = useState('')
	const [about, setAbout] = useState('')
	const [destination, setDestination] = useState('')
	const [loading, setLoading] = useState(false)
	const [fields, setFields] = useState(false)
	const [category, setCategory] = useState<string | null>(null)
	const [imageAsset, setImageAsset] = useState<string | null>(null)
	const [wrongImageType, setWrongImageType] = useState(false)

	const navigate = useNavigate()
	const queryClient = useQueryClient()

	const mutation = useMutation({
		mutationFn: (formData: FormData) =>
			newRequest.post('files/upload', formData).then((res) => res.data),
		onSuccess: (data: string[]) => {
			setImageAsset(data[0])
			setLoading(false)
		},
	})

	const uploadImage: ChangeEventHandler<HTMLInputElement> = (e) => {
		if (!e.target.files) return
		const file = e.target.files[0]
		const { type } = file
		if (
			type === 'image/png' ||
			type === 'image/svg' ||
			type === 'image/jpeg' ||
			type === 'image/gif' ||
			type === 'image/tiff'
		) {
			setWrongImageType(false)
			setLoading(true)
			const formData = new FormData()
			formData.append('file', file)
			mutation.mutate(formData)
		} else {
			setWrongImageType(true)
		}
	}

	const mutation2 = useMutation({
		mutationFn: (pin: Omit<Pin, 'id'>) =>
			newRequest.post('pins', pin).then((res) => res.data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['feed'] })
			navigate('/')
		},
		onError: (err) => console.log(err),
	})

	const savePin = () => {
		if (title && about && destination && imageAsset && category && user) {
			mutation2.mutate({
				title,
				about,
				destination,
				imagePath: imageAsset,
				category,
				ownerId: user.id,
			})
		} else {
			setFields(true)
			setTimeout(() => setFields(false), 2000)
		}
	}

	return (
		<div className='mt-5 flex flex-col items-center justify-center lg:h-4/5'>
			{fields && (
				<p className='mb-5 text-xl text-red-500 transition-all duration-150 ease-in'>
					Please fill in all the fields
				</p>
			)}
			<div
				className={`
					flex w-full flex-col items-center justify-center
					bg-white p-3 lg:w-4/5 lg:flex-row lg:p-5
				`}
			>
				<div className='bg-secondaryColor flex-0.7 flex w-full p-3'>
					<div
						className={`
							h-420 flex w-full flex-col items-center justify-center 
							border-2 border-dotted border-gray-300 p-3
						`}
					>
						{loading && <Spinner message='' />}
						{wrongImageType && <p>Wrong Image Type</p>}
						{!imageAsset ? (
							<>
								<label htmlFor='upload-image'>
									<div className='flex h-full flex-col items-center justify-center'>
										<div className='flex flex-col items-center justify-center'>
											<p className='text-2xl font-bold'>
												<AiOutlineCloudUpload />
											</p>
											<p className='text-lg'>Click to upload</p>
										</div>
										<p className='mt-32 text-gray-400'>
											Use high-quality JPG, SVG, PNG, GIF less than 20MB
										</p>
									</div>
								</label>
								<input
									id='upload-image'
									type='file'
									name='upload-image'
									onChange={uploadImage}
									className='h-0 w-0'
								/>
							</>
						) : (
							<div className='relative h-full'>
								<img
									src={imageAsset}
									alt='uploaded-picture'
									className='h-full w-full'
								/>
								<button
									type='button'
									className={`
										absolute bottom-3 right-3 cursor-pointer rounded-full bg-white 
										p-3 text-xl outline-none transition-all 
										duration-500 ease-in-out hover:shadow-md
									`}
									onClick={() => setImageAsset(null)}
								>
									<MdDelete />
								</button>
							</div>
						)}
					</div>
				</div>

				<div className='lg:pl5 mt-5 flex w-full flex-1 flex-col gap-6'>
					<input
						type='text'
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						placeholder='Add your title here'
						className='border-b-2 border-gray-200 p-2 text-2xl font-bold outline-none sm:text-3xl'
					/>
					{user && (
						<div className='my-2 flex items-center gap-2 rounded-lg bg-white'>
							<img
								src={user?.imagePath}
								alt='user-profile'
								className='h-10 w-10 rounded-full'
							/>
							<p className='font-bold'>{user?.userName}</p>
						</div>
					)}
					<input
						type='text'
						value={about}
						onChange={(e) => setAbout(e.target.value)}
						placeholder='What is your pin about'
						className='border-b-2 border-gray-200 p-2 text-base outline-none sm:text-lg'
					/>
					<input
						type='text'
						value={destination}
						onChange={(e) => setDestination(e.target.value)}
						placeholder='Add a destination link'
						className='border-b-2 border-gray-200 p-2 text-base outline-none sm:text-lg'
					/>
					<div className='flex flex-col'>
						<div>
							<p className='mb-2 text-lg font-semibold sm:text-xl'>
								Choose Pin Category
							</p>
							<select
								onChange={(e) => setCategory(e.target.value)}
								className='w-4/5 cursor-pointer rounded-md border-b-2 border-gray-200 p-2 text-base outline-none'
							>
								<option value='other' className='bg-white'>
									Select Category
								</option>
								{CATEGORIES.map((c) => (
									<option
										key={c.name}
										value={c.name}
										className='border-0 bg-white text-base capitalize text-black outline-none'
									>
										{c.name}
									</option>
								))}
							</select>
						</div>
						<div className='mt-5 flex items-end justify-end'>
							<button
								type='button'
								onClick={savePin}
								className='w-28 rounded-full bg-red-500 p-2 font-bold text-white outline-none'
							>
								Save Pin
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default CreatePin
