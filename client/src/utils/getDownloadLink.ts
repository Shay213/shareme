export default (filePath: string) => {
	const arr = filePath.split('/')
	const link = `http://localhost:8800/api/download/${arr[arr.length - 1]}`
	return link
}
