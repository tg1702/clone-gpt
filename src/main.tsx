
import ReactDOM from 'react-dom/client'
import App from './pages/App.tsx'
import './css/index.css'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
)
