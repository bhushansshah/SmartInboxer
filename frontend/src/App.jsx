// import './App.css'
import {BrowserRouter, Route, Routes, Navigate} from 'react-router-dom'
import Navbar from './components/Navbar'
import Login from './components/Login'
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignupPage'
import Home from "./pages/Home"
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
    <div className='min-h-screen bg-diagonal-lines text-white'>
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path='/signup-new' element={<SignUpPage/>}/>
          <Route path="/login-new" element={<LoginPage/>}/>
          <Route path="/home" element={<Home/>} />
          <Route path="/login" element={<GoogleAuthWrapper/>} />
          <Route path="/" element={<Navigate to='/login' />} />
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path='*' element={<PageNotFound/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
