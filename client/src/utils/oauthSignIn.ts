const CLIENTID = import.meta.env.VITE_GOOGLE_API_TOKEN as string

export default function oauthSignIn() {
	// Google's OAuth 2.0 endpoint for requesting an access token
	const oauth2Endpoint = 'https://accounts.google.com/o/oauth2/v2/auth'

	// Create <form> element to submit parameters to OAuth 2.0 endpoint.
	const form = document.createElement('form')
	form.setAttribute('method', 'GET') // Send as a GET request.
	form.setAttribute('action', oauth2Endpoint)

	const params: {
		client_id: string
		redirect_uri: string
		response_type: string
		scope: string
		include_granted_scopes: string
		state: string
		[key: string]: string
	} = {
		client_id: CLIENTID,
		redirect_uri: 'http://localhost:5173/redirect',
		response_type: 'token',
		scope: 'https://www.googleapis.com/auth/userinfo.profile',
		include_granted_scopes: 'true',
		state: 'pass-through value',
	}

	// Add form parameters as hidden input values.
	for (const p in params) {
		const input = document.createElement('input')
		input.setAttribute('type', 'hidden')
		input.setAttribute('name', p)
		input.setAttribute('value', params[p])
		form.appendChild(input)
	}
	// Add form to page and submit it to open the OAuth 2.0 endpoint.
	document.body.appendChild(form)
	form.submit()
}
