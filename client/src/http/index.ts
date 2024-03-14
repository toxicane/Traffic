import axios, { AxiosInstance, AxiosRequestConfig, AxiosError } from 'axios'
import type { BaseQueryFn } from '@reduxjs/toolkit/query'

export const API_URL = 'http://localhost:5000/api/'

export const $axios: AxiosInstance = axios.create({
	baseURL: API_URL,
	withCredentials: true,
})

$axios.interceptors.request.use(config => {
	config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
	return config
})

$axios.interceptors.response.use(response => {
	return response.data
})

export const axiosBaseQuery =
	(
		{ baseUrl }: { baseUrl: string } = { baseUrl: '' }
	): BaseQueryFn<
		{
			url: string
			method?: AxiosRequestConfig['method']
			data?: AxiosRequestConfig['data']
			params?: AxiosRequestConfig['params']
			headers?: AxiosRequestConfig['headers']
		},
		unknown,
		unknown
	> =>
	async ({ url, method, data, params, headers }) => {
		try {
			const result = await $axios({
				url: baseUrl + url,
				method,
				data,
				params,
				headers,
			})
			return { data: result.data }
		} catch (axiosError) {
			const err = axiosError as AxiosError
			return {
				error: {
					status: err.response?.status,
					data: err.response?.data || err.message,
				},
			}
		}
	}

export default $axios
