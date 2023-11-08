import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import store from 'src/redux/store.ts'
import App from 'src/App'

const container = document.getElementById('root')
const root = createRoot(container!)
root.render(
	<Provider store={store}>
		<App />
	</Provider>,
)
