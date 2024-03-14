import { Outlet, Navigate } from 'react-router-dom'
import { useAppSelector } from '../hooks/redux'
import { authApi } from '../store/services/AuthService'
import { CircularProgress } from '@mui/material'
import { RoutePath } from '../router/routes'
import { getIsAuth } from '../store/reducers/AuthSlice'

const PrivateRoutes = () => {
	const { isLoading } = authApi.useRefreshQuery()
	const isAuth = useAppSelector(getIsAuth)

	if (isLoading)
		return (
			<CircularProgress
				sx={{
					position: 'absolute',
					top: '50%',
					left: '50%',
					transform: 'translate(-50%, -50%)',
				}}
			/>
		)

	return isAuth ? <Outlet /> : <Navigate to={RoutePath.login} />
}

export default PrivateRoutes
