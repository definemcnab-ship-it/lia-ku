import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import PhoneFrame from './components/PhoneFrame.jsx'
import Login from './screens/Login.jsx'
import Home from './screens/Home.jsx'
import AIScan from './screens/AIScan.jsx'
import Report from './screens/Report.jsx'
import Training from './screens/Training.jsx'
import Progress from './screens/Progress.jsx'
import Profile from './screens/Profile.jsx'

// 斯俪 Slique 原型路由
// 登录页全屏展示；其余页面在带底部导航的手机框内展示。
export default function App() {
  const loc = useLocation()
  const isLogin = loc.pathname === '/login'

  return (
    <PhoneFrame chrome={!isLogin}>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/scan" element={<AIScan />} />
        <Route path="/report" element={<Report />} />
        <Route path="/training" element={<Training />} />
        <Route path="/progress" element={<Progress />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </PhoneFrame>
  )
}
