import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from '@/pages/landing/Home'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<div>Login</div>} />
        <Route path="/dashboard" element={<div>Dashboard</div>} />
        <Route path="/admin" element={<div>Admin</div>} />
        <Route path="/live/:eventId" element={<div>Live Event</div>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
