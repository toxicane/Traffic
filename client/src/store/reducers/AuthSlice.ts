import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IUser } from '../../models/IUser'
import { RootState } from '../store'
import { jwtDecode } from 'jwt-decode'

interface TodoState {
	isAuth: boolean
	user: IUser
}

const initialState: TodoState = {
	isAuth: false,
	user: {} as IUser,
}

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setAuth(state, action: PayloadAction<string>) {
			const { id, ...user }: any = jwtDecode(action.payload)
			state.isAuth = true
			state.user = user as IUser
		},
		logout: () => initialState,
	},
})

export const { setAuth, logout } = authSlice.actions
export default authSlice.reducer

export const getIsAuth = (state: RootState) => state.authReducer.isAuth
export const getUser = (state: RootState) => state.authReducer.user
