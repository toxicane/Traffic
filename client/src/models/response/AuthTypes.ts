import { IUser } from '../IUser'

export interface AuthRequest {
	email: string
	name?: string
	password: string
}

export interface AuthResponse {
	accessToken: string
	refreshToken: string
	user: IUser
}
