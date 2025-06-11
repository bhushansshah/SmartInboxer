// import './App.css'
import {BrowserRouter, Route, Routes, Navigate} from 'react-router-dom'
import Navbar from './components/Navbar'
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage'
import Home from "./pages/Home"
import PageNotFound from './components/PageNotFound'
import { GoogleOAuthProvider } from '@react-oauth/google'

const GoogleAuthWrapper = ({children}) => {
  return (<GoogleOAuthProvider clientId='1023717120219-ig15h3rn0g7vs465jqum177li1u557lu.apps.googleusercontent.com'>
    {children}
  </GoogleOAuthProvider>)
}

function App() {

  return (
    <div className='min-h-screen bg-diagonal-lines text-white'>
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path='/signup' element={<GoogleAuthWrapper><SignUpPage/></GoogleAuthWrapper>}/>
          <Route path="/home" element={<Home/>} />
          <Route path="/login" element={<GoogleAuthWrapper><LoginPage/></GoogleAuthWrapper>} />
          <Route path="/" element={<Navigate to='/login' />} />
          <Route path='*' element={<PageNotFound/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
