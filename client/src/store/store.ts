import { combineReducers, configureStore } from '@reduxjs/toolkit'

import authReducer from './reducers/AuthSlice'
import { authApi } from './services/AuthService'
import { userApi } from './services/UserService'
import { mapApi } from './services/MapService'

const rootReducer = combineReducers({
	authReducer,
	[authApi.reducerPath]: authApi.reducer,
	[userApi.reducerPath]: userApi.reducer,
	[mapApi.reducerPath]: mapApi.reducer,
})

export const setupStore = () => {
	return configureStore({
		reducer: rootReducer,
		middleware: getDefaultMiddleware =>
			getDefaultMiddleware().concat([
				authApi.middleware,
				userApi.middleware,
				mapApi.middleware,
			]),
	})
}

export type RootState = ReturnType<typeof rootReducer> //тип состояния
export type AppStore = ReturnType<typeof setupStore> //тип стора
export type AppDispatch = AppStore['dispatch'] //теперь мы не сможем диспатчить неопределённые экшены
