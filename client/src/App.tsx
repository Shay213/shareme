import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Home from './pages/Home'
import Redirect from './pages/Redirect'
import { useEffect, useState } from 'react'

function App() {
	const [isAuth, setIsAuth] = useState(false)

	useEffect(() => {
		const currUser = localStorage.getItem('currUser')
		setIsAuth(!!currUser)
	}, [])

	return (
		<Routes>
			<Route path='/login' element={<Login />} />
			<Route path='/redirect' element={<Redirect />} />
			<Route
				path='/*'
				element={isAuth ? <Home /> : <Navigate to='/login' replace />}
			/>
		</Routes>
	)
}

export default App
