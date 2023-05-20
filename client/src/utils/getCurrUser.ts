interface CurrUser {
	id: string
	userName: string
	imagePath: string
}

export default (): CurrUser | undefined =>
	localStorage.getItem('currUser')
		? JSON.parse(localStorage.getItem('currUser') as string)
		: localStorage.clear()
