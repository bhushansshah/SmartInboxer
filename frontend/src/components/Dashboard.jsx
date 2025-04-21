import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
function Dashboard() {
  const [userInfo, setUserInfo] = React.useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const data = localStorage.getItem("mind-mate");
    if (data) {
      const user = JSON.parse(data);
      setUserInfo(user);
    }
    else{
      alert("Login required");
      navigate("/login");
    }
  }
  , [])

  const handleLogout = () => {
    localStorage.removeItem("mind-mate");
    setUserInfo(null);
    navigate("/login");
  }
  return (
    <div>
      <h1>Dashboard</h1>
      <h2>Welcome {userInfo?.user?.name}</h2>
      <h3>Your email: {userInfo?.user?.email}</h3>
      <button onClick={handleLogout}>Log Out</button>
    </div>
  )
}

export default Dashboard
