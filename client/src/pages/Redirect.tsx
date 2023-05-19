import { useNavigate } from 'react-router-dom'
import oauthSignIn from '../utils/oauthSignIn'
import axios from 'axios'
import { useEffect } from 'react'

const Redirect = () => {
	const navigate = useNavigate()
	const fragmentString = location.hash.substring(1)
	const params: {
		[key: string]: string
	} = {}
	const regex = /([^&=]+)=([^&]*)/g
	let m
	while ((m = regex.exec(fragmentString))) {
		params[decodeURIComponent(m[1])] = decodeURIComponent(m[2])
	}
	const today = new Date()
	const accessToken = params['access_token']
	const expiresIn = new Date(
		today.getFullYear(),
		today.getMonth(),
		today.getDate(),
		today.getHours(),
		today.getMinutes(),
		today.getSeconds() + +params['expires_in']
	)
	const oAuth2 = {
		accessToken,
		expiresIn,
	}

	const getUser = async () => {
		if (params && params['access_token']) {
			const headers = {
				Authorization: `Bearer ${accessToken}`,
			}
			const personFields = 'names,photos,metadata'

			try {
				const res = await axios.get(
					`https://people.googleapis.com/v1/people/me`,
					{ headers, params: { personFields: personFields } }
				)
				const userId = res.data.metadata.sources.find(
					(source) => source.type === 'PROFILE'
				).id
				const user = {
					id: userId,
					userName: res.data.names[0].displayName,
					imagePath: res.data.photos[0].url,
				}
				await axios.post('http://localhost:8800/api/auth/googlesignup', user)
				localStorage.setItem('currUser', JSON.stringify(user))
				localStorage.setItem('auth', JSON.stringify(oAuth2))
				navigate('/')
			} catch (error) {
				console.log(error)
				oauthSignIn()
			}
		} else {
			oauthSignIn()
		}
	}

	useEffect(() => {
		getUser()
	}, [])

	return <div>Redirect</div>
}

export default Redirect
