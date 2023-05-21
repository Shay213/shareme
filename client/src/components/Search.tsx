import { useQuery } from '@tanstack/react-query'
import { MasonryLayout, Spinner } from '.'
import newRequest from '../utils/newRequest'
import { useEffect } from 'react'

interface SearchProps {
	searchTerm: string
	setSearchTerm: React.Dispatch<React.SetStateAction<string>>
}

const Search = ({ searchTerm, setSearchTerm }: SearchProps) => {
	const { isLoading, isError, data, refetch } = useQuery({
		queryKey: ['searchPins'],
		queryFn: () =>
			newRequest.get(`pins/search?term=${searchTerm}`).then((res) => res.data),
	})

	useEffect(() => {
		refetch()
	}, [searchTerm])

	if (isLoading) return <Spinner message='Searching for pins...' />
	if (isError)
		return (
			<div className='mt-10 text-center text-xl'>Something went wrong!</div>
		)
	if (data.length === 0 && searchTerm !== '' && !isLoading)
		return <div className='mt-10 text-center text-xl'>No pins found!</div>

	return <MasonryLayout pins={data} />
}

export default Search
