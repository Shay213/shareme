import axios from 'axios'

const axiosInst = axios.create({
	baseURL: 'http://localhost:8800/api/',
	withCredentials: true,
})

export default axiosInst
