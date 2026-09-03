import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from '@/pages/landing/Home'
import AuthPage from '@/pages/auth/AuthPage'
import { ThemeSync } from '@/components/ThemeSync'

function App() {
  return (
    <>
      <ThemeSync />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<AuthPage />} />
          <Route path="/signup" element={<AuthPage />} />
          <Route path="/dashboard" element={<div>Dashboard</div>} />
          <Route path="/admin" element={<div>Admin</div>} />
          <Route path="/live/:eventId" element={<div>Live Event</div>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
