import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './index.css'
import Auth from './pages/Auth'
import Dashboard from './pages/Dashboard'
import AddTree from './pages/AddTree'
import TreeDetail from './pages/TreeDetail'
import CarbonLedger from './pages/CarbonLedger'
import Leaderboard from './pages/Leaderboard'
import ProfilePage from './pages/Profile'
import Layout from './components/Layout'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return (
    <BrowserRouter basename="/mytrees">
      <Routes>
        <Route path="/" element={<Navigate to="/add-tree" replace />} />
        <Route path="/auth" element={<Auth />} />
        {/* AddTree is public — auth gate is inside the submit handler */}
        <Route path="/add-tree"    element={<Layout><AddTree /></Layout>} />
        <Route path="/dashboard"   element={<ProtectedRoute><Layout><Dashboard /></Layout></ProtectedRoute>} />
        <Route path="/tree/:id"    element={<ProtectedRoute><Layout><TreeDetail /></Layout></ProtectedRoute>} />
        <Route path="/carbon"      element={<ProtectedRoute><Layout><CarbonLedger /></Layout></ProtectedRoute>} />
        <Route path="/leaderboard" element={<ProtectedRoute><Layout><Leaderboard /></Layout></ProtectedRoute>} />
        <Route path="/profile"     element={<ProtectedRoute><Layout><ProfilePage /></Layout></ProtectedRoute>} />
        <Route path="*" element={<Navigate to="/add-tree" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
