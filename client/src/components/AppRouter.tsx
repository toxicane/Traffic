import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { routes, privateRoutes } from '../router/routes'
import MainPage from '../page/MainPage'
import PrivateRoutes from './PrivateRoutes'

const AppRouter = () => {
	return (
		<BrowserRouter>
			<Routes>
				{routes.map(({ path, element }) => (
					<Route key={path} path={path} element={element}></Route>
				))}
				<Route element={<PrivateRoutes />}>
					{privateRoutes.map(({ path, element }) => (
						<Route key={path} path={path} element={element}></Route>
					))}
				</Route>
				{/* <Route path='*' element={<News />} /> */}
				<Route path='*' element={<MainPage />} />
			</Routes>
		</BrowserRouter>
	)
}

export default AppRouter
