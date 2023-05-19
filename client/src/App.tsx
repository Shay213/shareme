import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Home from './pages/Home'
import Redirect from './pages/Redirect'

function App() {
	return (
		<Routes>
			<Route path='/login' element={<Login />} />
			<Route path='/redirect' element={<Redirect />} />
			<Route path='/*' element={<Home />} />
		</Routes>
	)
}

export default App
