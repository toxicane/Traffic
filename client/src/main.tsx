import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { Provider } from 'react-redux'
import { setupStore } from './store/store.ts'
import { StyledEngineProvider, CssBaseline } from '@mui/material'

const store = setupStore()

ReactDOM.createRoot(document.getElementById('root')!).render(
	<Provider store={store}>
		<StyledEngineProvider injectFirst>
			<CssBaseline />
			<App />
		</StyledEngineProvider>
	</Provider>
)
