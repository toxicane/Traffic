import { FC } from 'react'
import { Box, Container, TextField } from '@mui/material'
import MyMap from '../components/Map'

const MainPage: FC = () => {
	return (
		<Container
			sx={{ display: 'flex', flexFlow: 'column nowrap', gap: 2, mt: 2 }}
		>
			<Box sx={{ width: '100%', height: '70vh' }}>
				<MyMap />
			</Box>
		</Container>
	)
}

export default MainPage
