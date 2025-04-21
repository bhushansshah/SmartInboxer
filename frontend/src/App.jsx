import './App.css'
import {BrowserRouter, Route, Routes, Navigate} from 'react-router-dom'
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import PageNotFound from './components/PageNotFound'
import { GoogleOAuthProvider } from '@react-oauth/google'

const GoogleAuthWrapper = () => {
  return (<GoogleOAuthProvider clientId='693643502118-90qerhsc6t58t43prim4tgl6gn8cpiuk.apps.googleusercontent.com'>
    <Login></Login>
  </GoogleOAuthProvider>)
}

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<GoogleAuthWrapper/>} />
        <Route path="/" element={<Navigate to='/login' />} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path='*' element={<PageNotFound/>}/>
      </Routes>
    </BrowserRouter>
    
  )
}

export default App
