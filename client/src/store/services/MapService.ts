import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const baseUrl = 'https://geocode-maps.yandex.ru/1.x'
const apikey = 'cbec486f-1239-48b0-8a04-71a961fe2647'

export const mapApi = createApi({
	reducerPath: 'mapAPI',
	baseQuery: fetchBaseQuery({ baseUrl }),
	endpoints: build => ({
		getCoordinates: build.mutation<any, string>({
			query: address => ({
				url: '',
				params: {
					apikey,
					geocode: `Хабаровск ${address}`,
					lang: 'ru_RU',
					format: 'json',
				},
			}),
			transformResponse: (data: any) =>
				data.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos,
		}),
		getAddress: build.mutation<any, [number, number]>({
			query: coordinates => ({
				url: '',
				params: {
					apikey,
					geocode: `${coordinates[0]},${coordinates[1]}`,
					lang: 'ru_RU',
					format: 'json',
				},
			}),
			transformResponse: (data: any) =>
				data.response.GeoObjectCollection.featureMember[0].GeoObject.name,
		}),
	}),
})
