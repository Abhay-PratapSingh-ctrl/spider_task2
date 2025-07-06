import { Routes, Route } from 'react-router-dom'
import ConnectPage from './pages/ConnectPage'
import Dashboard from './components/Dashboard'

function App() {
  return (
    <Routes>
      <Route path="/" element={<ConnectPage />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  )
}

export default App
