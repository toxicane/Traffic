import { Slide } from '@mui/material'
import useScrollTrigger from '@mui/material/useScrollTrigger'
import PropTypes from 'prop-types'

export default function HideOnScroll({ children }) {
	const trigger = useScrollTrigger()

	return children ? (
		<Slide appear={false} direction='down' in={!trigger}>
			{children}
		</Slide>
	) : null
}

HideOnScroll.propTypes = {
	children: PropTypes.node.isRequired,
}
