import { RouteProps } from 'react-router-dom'

import MainPage from '../page/MainPage'
import AuthPage from '../page/AuthPage'

export enum AppRoutes {
	MAIN = 'main',
	LOGIN = 'login',
	REGISTRATION = 'registration',
	USERS = 'user',
}

export const RoutePath: Record<AppRoutes, string> = {
	[AppRoutes.MAIN]: '/main',
	[AppRoutes.LOGIN]: '/login',
	[AppRoutes.REGISTRATION]: '/registration',
	[AppRoutes.USERS]: '/user',
}

export const routes: RouteProps[] = [
	{ path: RoutePath.registration, element: <AuthPage /> },
	{ path: RoutePath.login, element: <AuthPage /> },
]

export const privateRoutes: RouteProps[] = [
	{ path: RoutePath.main, element: <MainPage /> },
	{ path: RoutePath.user, element: <MainPage /> },
]
