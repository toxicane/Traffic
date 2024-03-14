import React, { useState } from 'react'
import { TextField, Button } from '@mui/material'
import AddressInput from './AddressInput'

const AddressPicker = () => {
	const [addresses, setAddresses] = useState<string[]>([''])

	const addAddressInput = () => {
		setAddresses([...addresses, ''])
	}

	return (
		<div>
			{addresses.map((_, index) => (
				<AddressInput key={index} />
			))}
			<Button onClick={addAddressInput}>Добавить адрес</Button>
		</div>
	)
}

export default AddressPicker
