import { TailSpin } from 'react-loader-spinner'

const Spinner = ({ message }: { message: string }) => {
	return (
		<div className='flex h-full w-full flex-col items-center justify-center'>
			<TailSpin width='200' color='#00BFFF' height='50' wrapperClass='m-5' />
			<p className='px-2 text-center text-md'>{message}</p>
		</div>
	)
}

export default Spinner
