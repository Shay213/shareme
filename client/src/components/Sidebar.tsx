import { User } from '../interfaces'
import { RiHomeFill } from 'react-icons/ri'
import { IoIosArrowForward } from 'react-icons/io'
import logo from '../assets/logo.png'
import { Link, NavLink } from 'react-router-dom'
import { CATEGORIES } from '../utils/data'

interface SidebarProps {
	user?: User
	closeToggle?: React.Dispatch<React.SetStateAction<boolean>>
}

const isNotActiveStyle =
	'flex items-center px-5 gap-3 text-gray-500 hover:text-black transition-all duration-200 ease-in-out capitalize'

const isActiveStyle =
	'flex items-center px-5 gap-3 font-extrabold border-r-2 border-black transition-all duration-200 ease-in-out capitalize'

const Sidebar = ({ user, closeToggle }: SidebarProps) => {
	const handleCloseSidebar = () => {
		closeToggle?.(false)
	}
	return (
		<div className='min-w-210 hide-scrollbar flex h-full flex-col justify-between overflow-y-scroll bg-white'>
			<div className='flex flex-col'>
				<Link
					to='/'
					className='w-190 my-6 flex items-center gap-2 px-5 pt-1'
					onClick={handleCloseSidebar}
				>
					<img src={logo} alt='logo' className='w-full' />
				</Link>
				<div className='flex flex-col gap-5'>
					<NavLink
						to='/'
						className={({ isActive }) =>
							isActive ? isActiveStyle : isNotActiveStyle
						}
						onClick={handleCloseSidebar}
					>
						<RiHomeFill /> Home
					</NavLink>
					<h3 className='mt-2 px-5 text-base 2xl:text-xl'>
						Discover categories
					</h3>
					{CATEGORIES.slice(0, CATEGORIES.length - 1).map((c) => (
						<NavLink
							key={c.name}
							to={`/category/${c.name.toLowerCase()}`}
							className={({ isActive }) =>
								isActive ? isActiveStyle : isNotActiveStyle
							}
							onClick={handleCloseSidebar}
						>
							<img
								src={c.image}
								alt='category-img'
								className='h-8 w-8 rounded-full shadow-sm'
							/>
							{c.name}
						</NavLink>
					))}
				</div>
			</div>
			{user && (
				<Link
					to={`/user-profile/${user.id}`}
					className='mx-3 my-10 mb-3 flex items-center gap-2 rounded-lg bg-white p-2 shadow-md'
					onClick={handleCloseSidebar}
				>
					<img
						src={user.imagePath}
						className='h-10 w-10 rounded-full'
						alt='user-profile'
					/>
					<p>{user.userName}</p>
				</Link>
			)}
		</div>
	)
}

export default Sidebar
