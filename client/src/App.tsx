import AppRouter from './components/AppRouter'
import FullScreenLoader from './components/FullScreenLoader'
import Header from './components/Header'
import { authApi } from './store/services/AuthService'

function App() {
	const { isLoading } = authApi.useRefreshQuery()
	if (isLoading) return <FullScreenLoader />

	return (
		<>
			<Header />
			<AppRouter />
		</>
	)
}

export default App
