import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { useAppSelector } from '../hooks/redux'
import { getUser } from '../store/reducers/AuthSlice'
import { authApi } from '../store/services/AuthService'
import { useNavigate } from 'react-router-dom'

const Header = () => {
	const { name } = useAppSelector(getUser)

	const [logout] = authApi.useLogoutMutation()

	function handleExit(e: any) {
		logout()
		authApi.useRefreshQuery()
	}

	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position='static'>
				<Toolbar>
					{/* <IconButton
						size='large'
						edge='start'
						color='inherit'
						aria-label='menu'
						sx={{ mr: 2 }}
					>
						<MenuIcon />
					</IconButton> */}
					<Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
						{name}
					</Typography>
					{name && (
						<Button color='inherit' onClick={handleExit}>
							Выйти
						</Button>
					)}
				</Toolbar>
			</AppBar>
		</Box>
	)
}

export default Header
