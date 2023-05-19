import { useNavigate } from 'react-router-dom'
import oauthSignIn from '../utils/oauthSignIn'
import axios from 'axios'

const GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_API_KEY as string

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
	const expiresIn = new Date(
		today.getFullYear(),
		today.getMonth(),
		today.getDate(),
		today.getHours(),
		today.getMinutes(),
		today.getSeconds() + +params['expires_in']
	)
	const oAuth2 = {
		accessToken: params['access_token'],
		expiresIn,
	}

	if (params && params['access_token']) {
		;(async () => {
			const accessToken = params['access_token']
			const headers = {
				Authorization: `Bearer ${accessToken}`,
			}
			const personFields = 'names,photos'

			try {
				const res = await axios.get(
					`https://people.googleapis.com/v1/people/me`,
					{ headers, params: { personFields: personFields } }
				)
				const user = {
					userName: res.data.names[0].displayName,
					imagePath: res.data.photos[0].url,
				}
				localStorage.setItem('currUser', JSON.stringify(user))
				localStorage.setItem('auth', JSON.stringify(oAuth2))
			} catch (error) {
				console.log(error)
				//oauthSignIn()
			}
		})()
	} else {
		oauthSignIn()
	}

	return <div>Redirect</div>
}

export default Redirect
