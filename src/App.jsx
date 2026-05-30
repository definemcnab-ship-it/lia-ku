import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import PhoneFrame from './components/PhoneFrame.jsx'
import Login from './screens/Login.jsx'
import Home from './screens/Home.jsx'
import AIScan from './screens/AIScan.jsx'
import Report from './screens/Report.jsx'
import Training from './screens/Training.jsx'
import Progress from './screens/Progress.jsx'
import Profile from './screens/Profile.jsx'
import Onboarding from './screens/Onboarding.jsx'
import Diet from './screens/Diet.jsx'
import DietPlan from './screens/DietPlan.jsx'
import TrainingPlayer from './screens/TrainingPlayer.jsx'
import CycleSettings from './screens/CycleSettings.jsx'
import Library from './screens/Library.jsx'
import Scene from './screens/Scene.jsx'
import Notifications from './screens/Notifications.jsx'
import Photos from './screens/Photos.jsx'
import Legal from './screens/Legal.jsx'

export default function App() {
  const loc = useLocation()
  const fullscreen = loc.pathname === '/login' || loc.pathname === '/onboarding' || loc.pathname === '/player'

  return (
    <PhoneFrame chrome={!fullscreen}>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/diet" element={<Diet />} />
        <Route path="/diet/plan/:id" element={<DietPlan />} />
        <Route path="/home" element={<Home />} />
        <Route path="/scan" element={<AIScan />} />
        <Route path="/report" element={<Report />} />
        <Route path="/training" element={<Training />} />
        <Route path="/library/:id" element={<Library />} />
        <Route path="/player" element={<TrainingPlayer />} />
        <Route path="/cycle" element={<CycleSettings />} />
        <Route path="/progress" element={<Progress />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/scene" element={<Scene />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/photos" element={<Photos />} />
        <Route path="/legal/:doc" element={<Legal />} />
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </PhoneFrame>
  )
}
