import share from '../assets/share.mp4'
import logo from '../assets/logowhite.png'
import { GoogleLogin } from '@react-oauth/google'
import oauthSignIn from '../utils/oauthSignIn'

const Login = () => {
	return (
		<div className='flex h-screen flex-col items-center justify-start '>
			<div className='relative h-full w-full'>
				<video
					src={share}
					itemType='video/mp4'
					loop
					controls={false}
					muted
					autoPlay
					className='h-full w-full object-cover'
				/>
				<div className='bg-blackOverlay absolute inset-0 flex flex-col items-center justify-center'>
					<div className='p-5'>
						<img src={logo} width='130px' alt='logo' />
					</div>
					<div className='shadow-2xl'>
						<GoogleLogin
							onSuccess={oauthSignIn}
							onError={() => console.log('Something went wrong')}
							cancel_on_tap_outside
						/>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Login
