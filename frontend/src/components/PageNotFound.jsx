import React from 'react'
import { useNavigate } from 'react-router-dom'
function PageNotFound() {
    const navigate = useNavigate();
    return (
        <div>
            <h1>404 - Page Not Found</h1>
            <p>The page you are looking for does not exist.</p>
            <p>Please check the URL or return to the home page.</p>
            <button onClick={() => navigate('/')}>Go to Home</button>
        </div>
  )
}

export default PageNotFound
