import { useRef, useState } from 'react'
import {
	YMap,
	YMapComponentsProvider,
	YMapDefaultSchemeLayer,
	YMapDefaultFeaturesLayer,
	YMapListener,
	YMapControls,
	YMapZoomControl,
	YMapDefaultMarker,
	YMapMarker,
} from 'ymap3-components'
import { Box, Button, TextField, Typography } from '@mui/material'
import axios from 'axios'
import AddressPicker from './AddressPicker'
import { mapApi } from '../store/services/MapService'

function MyMap() {
	interface ILocationState {
		center: [number, number]
		zoom: number
	}

	interface IMarker {
		coordinates: [number, number]
		id: number
	}

	const initialLocation: ILocationState = {
		center: [135.071902, 48.48019],
		zoom: 13,
	}

	const apiKey = 'cbec486f-1239-48b0-8a04-71a961fe2647'

	const [location, setLocation] = useState<ILocationState>(initialLocation)
	const [markers, setMarkers] = useState<IMarker[]>([])
	const markerIdRef = useRef<number>(0)

	// const onUpdate = React.useCallback(({ location, mapInAction }: any) => {
	// 	if (!mapInAction) {
	// 		setLocation({
	// 			center: location.center,
	// 			zoom: location.zoom,
	// 		})
	// 	}
	// }, [])

	const coordinatesToAddress = async (address: [number, number]) => {
		try {
			const response = await axios.get('https://geocode-maps.yandex.ru/1.x', {
				params: {
					apikey: apiKey,
					geocode: `${address[0]}, ${address[1]}`,
					lang: 'ru_RU',
					format: 'json',
				},
			})

			const responseAddress =
				response.data.response.GeoObjectCollection.featureMember[0].GeoObject
					.name

			return responseAddress
		} catch (error) {
			console.error('Error fetching geocoding data:', error)
		}
	}

	const addressToCoordinates = async (address: string) => {
		try {
			const response = await axios.get('https://geocode-maps.yandex.ru/1.x', {
				params: {
					apikey: apiKey,
					geocode: `Хабаровск ${address}`,
					lang: 'ru_RU',
					format: 'json',
				},
			})

			const responseCoordinates =
				response.data.response.GeoObjectCollection.featureMember[0].GeoObject
					.Point.pos

			return responseCoordinates.split(' ')
		} catch (error) {
			console.error('Error fetching geocoding data:', error)
		}
	}

	const onClick = async (_: any, e: any) => {
		const clickedCoordinates = e.coordinates
		const newMarkers = [
			...markers,
			{ coordinates: clickedCoordinates, id: markerIdRef.current },
		]
		setMarkers(newMarkers)
		markerIdRef.current++
		// console.log(await coordinatesToAddress(clickedCoordinates))
	}

	const [address, setAddress] = useState<string>('')

	const getCords = async () => {
		// const coordinates = await addressToCoordinates(address)
		const coordinates = [135.063257, 48.493504] as [number, number]
		const newMarkers = [
			...markers,
			{ coordinates: coordinates, id: markerIdRef.current },
		]
		setMarkers(newMarkers)
		markerIdRef.current++
		console.log(coordinates)
	}

	function onDragEndHandler(coordinates: any, markerId: number) {
		const updatedMarkers = markers.map(marker =>
			marker.id === markerId ? { ...marker, coordinates: coordinates } : marker
		)
		setMarkers(updatedMarkers)
	}

	return (
		<Box sx={{ display: 'flex', flexFlow: 'column-reverse nowrap', gap: 2 }}>
			<TextField
				fullWidth
				id='address'
				label='Адрес'
				value={address}
				onChange={e => setAddress(e.target.value)}
			/>
			{/* <AddressPicker /> */}
			<Button onClick={getCords}>Получить координаты</Button>
			<Typography>
				{markers.map(marker => (
					<div key={marker.id}>
						Координаты маркера {marker.id}: {marker.coordinates.join(', ')}
					</div>
				))}
			</Typography>
			<div style={{ height: '70vh', width: '70vw' }}>
				<YMapComponentsProvider apiKey={apiKey} lang='ru_RU'>
					<YMap key='map' location={location} mode='vector'>
						<YMapDefaultSchemeLayer />
						<YMapDefaultFeaturesLayer />
						<YMapListener layer='any' onClick={onClick} />
						{markers.map(marker => (
							<YMapMarker
								key={marker.id}
								coordinates={marker.coordinates}
								data-marker-id={marker.id}
								draggable={true}
								onDragEnd={coordinates => {
									onDragEndHandler(coordinates, marker.id)
								}}
							>
								<div
									style={{
										textAlign: 'center',
										width: '27px',
										height: '27px',
										borderRadius: '50%',
										backgroundColor: 'red',
										display: 'flex',
										justifyContent: 'center',
										alignItems: 'center',
										color: 'white',
									}}
								>
									{marker.id + 1}
								</div>
							</YMapMarker>
						))}
						<YMapControls position='bottom'>
							<YMapZoomControl />
						</YMapControls>
					</YMap>
				</YMapComponentsProvider>
			</div>
		</Box>
	)
}

export default MyMap
