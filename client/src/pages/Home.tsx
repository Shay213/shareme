import { HiMenu } from 'react-icons/hi'
import { AiFillCloseCircle } from 'react-icons/ai'
import { Sidebar, UserProfile, Pins } from '../components'
import logo from '../assets/logo.png'
import { useEffect, useRef, useState } from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import newRequest from '../utils/newRequest'
import { User } from '../interfaces'

const Home = () => {
	const [toggleSidebar, setToggleSidebar] = useState(false)
	const scrollRef = useRef<HTMLDivElement | null>(null)

	const userInfo = localStorage.getItem('currUser')
		? JSON.parse(localStorage.getItem('currUser') as string)
		: localStorage.clear()

	const { data } = useQuery<User>({
		queryKey: [`user:${userInfo.id}`],
		queryFn: () =>
			newRequest.get(`users/${userInfo.id}`).then((res) => res.data),
	})

	useEffect(() => {
		if (scrollRef.current) scrollRef.current.scrollTo(0, 0)
	}, [])

	return (
		<div className='transition-height flex h-screen flex-col bg-gray-50 duration-75 ease-out md:flex-row'>
			<div className='hidden md:flex h-screen flex-initial'>
				<Sidebar user={data && data} />
			</div>
			<div className='flex flex-row md:hidden'>
				<div className='flex w-full flex-row items-center justify-between p-2 shadow-md'>
					<HiMenu
						className='cursor-pointer text-4xl'
						onClick={() => setToggleSidebar(true)}
					/>
					<Link to='/'>
						<img src={logo} alt='logo' className='w-28' />
					</Link>

					<Link to={`/user-profile/${data && data.id}`}>
						<img
							src={data && data.imagePath}
							alt='userImage'
							className='w-28'
						/>
					</Link>
				</div>
				{toggleSidebar && (
					<div className='animate-slide-in fixed z-10 h-screen w-4/5 overflow-y-auto bg-white shadow-md'>
						<div className='absolute flex w-full items-center justify-end p-2'>
							<AiFillCloseCircle
								fontSize={30}
								className='cursor-pointer'
								onClick={() => setToggleSidebar(false)}
							/>
						</div>
						<Sidebar user={data && data} closeToggle={setToggleSidebar} />
					</div>
				)}
			</div>

			<div className='h-screen flex-1 overflow-y-scroll pb-2' ref={scrollRef}>
				<Routes>
					<Route path='/user-profile/:id' element={<UserProfile />} />
					<Route path='/*' element={<Pins user={data && data} />} />
				</Routes>
			</div>
		</div>
	)
}

export default Home
