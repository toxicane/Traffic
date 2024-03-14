import { Paper, CircularProgress } from '@mui/material'

const FullScreenLoader = () => {
	return (
		<div
			style={{
				backgroundColor: 'rgba(0, 0, 0, 0.5)',
				zIndex: 9999,
				width: '100%',
				height: '100vh',
			}}
		>
			<Paper
				elevation={2}
				sx={{
					p: 3,
					position: 'absolute',
					top: '50%',
					left: '50%',
					transform: 'translate(-50%, -50%)',
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				<CircularProgress />
			</Paper>
		</div>
	)
}

export default FullScreenLoader
