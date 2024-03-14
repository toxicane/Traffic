import {
	BaseQueryFn,
	FetchArgs,
	FetchBaseQueryError,
	createApi,
	fetchBaseQuery,
} from '@reduxjs/toolkit/query/react'
import { baseUrl, handleAuthSuccess } from './AuthService'
import { AuthResponse } from '../../models/response/AuthTypes'
import { logout } from '../reducers/AuthSlice'

const baseQuery = fetchBaseQuery({
	baseUrl,
	credentials: 'include',
	prepareHeaders(headers) {
		const token = localStorage.getItem('token')
		if (token) {
			headers.set('Authorization', `Bearer ${token}`)
		}
		return headers
	},
})

const baseQueryWithReauth: BaseQueryFn<
	string | FetchArgs,
	unknown,
	FetchBaseQueryError
> = async (args, api, extraOptions) => {
	let result = await baseQuery(args, api, extraOptions)

	if (result?.error?.status === 401) {
		const refreshResult = await baseQuery('/refresh', api, extraOptions)
		if (refreshResult?.data) {
			handleAuthSuccess(api.dispatch, refreshResult?.data as AuthResponse)
			result = await baseQuery(args, api, extraOptions)
		} else {
			api.dispatch(logout())
		}
	}
	return result
}

export const userApi = createApi({
	reducerPath: 'userAPI',
	baseQuery: baseQueryWithReauth,
	tagTypes: ['User'],
	endpoints: build => ({
		getUsers: build.query<Object, void>({
			query: () => ({
				url: '/users',
				method: 'GET',
			}),
		}),
	}),
})
