import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { mapApi } from '../services/MapService'

interface IMarker {
	id: number
	coordinates: [number, number]
	name: string
}

interface MapState {
	// Определи состояние карты, если необходимо
}

const initialState: MapState[] = []

const mapSlice = createSlice({
	name: 'map',
	initialState,
	reducers: {
		addMarker(state, action: PayloadAction<[number, number] | string>) {
			// if (typeof action.payload === 'string') {
			// 	// Если пришла строка, вызываем запрос на получение координат
			// 	const address = action.payload
			// 	mapApi.endpoints.getCoordinates
			// 		.mutateAsync(address)
			// 		.then((coordinates: [number, number]) => {
			// 			// Делаем что-то с полученными координатами, например, добавляем маркер на карту
			// 			const marker: IMarker = {
			// 				id: state.length + 1,
			// 				coordinates,
			// 				name: address,
			// 			}
			// 			state.push(marker)
			// 		})
			// 		.catch((error: any) => {
			// 			console.error('Ошибка при получении координат:', error)
			// 		})
			// } else {
			// 	// Если пришел массив, используем его напрямую
			// 	const coordinates = action.payload
			// 	mapApi.endpoints.getAddress
			// 		.mutateAsync(coordinates)
			// 		.then((address: string) => {
			// 			// Делаем что-то с полученным адресом, например, добавляем маркер на карту
			// 			const marker: IMarker = {
			// 				id: state.length + 1,
			// 				coordinates,
			// 				name: address,
			// 			}
			// 			state.push(marker)
			// 		})
			// 		.catch((error: any) => {
			// 			console.error('Ошибка при получении адреса:', error)
			// 		})
			// }
		},
	},
})

export const { addMarker } = mapSlice.actions
export default mapSlice.reducer
