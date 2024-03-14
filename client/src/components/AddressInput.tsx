import { TextField } from '@mui/material'
import React, { useState } from 'react'

const AddressInput = () => {
	const [address, setAddress] = useState<string>('')

	return (
		<div>
			<TextField
				fullWidth
				id='address'
				label='Адрес'
				value={address}
				onChange={e => setAddress(e.target.value)}
			/>
		</div>
	)
}

export default AddressInput
