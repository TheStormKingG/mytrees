import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './index.css'
import Dashboard from './pages/Dashboard'
import AddTree from './pages/AddTree'
import TreeDetail from './pages/TreeDetail'
import CarbonLedger from './pages/CarbonLedger'
import Leaderboard from './pages/Leaderboard'
import ProfilePage from './pages/Profile'
import Layout from './components/Layout'

function App() {
  return (
    <BrowserRouter basename="/mytrees">
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
        <Route path="/add-tree" element={<Layout><AddTree /></Layout>} />
        <Route path="/tree/:id" element={<Layout><TreeDetail /></Layout>} />
        <Route path="/carbon" element={<Layout><CarbonLedger /></Layout>} />
        <Route path="/leaderboard" element={<Layout><Leaderboard /></Layout>} />
        <Route path="/profile" element={<Layout><ProfilePage /></Layout>} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
