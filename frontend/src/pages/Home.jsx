import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
export default function Home() {
    const [userInfo, setUserInfo] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        const data = localStorage.getItem("smartInboxer");
        if (data) {
        const user = JSON.parse(data);
        console.log(user)
        setUserInfo(user);
        }
        else{
        alert("Login required");
        navigate("/login-new");
        }
    }
    , [])
    const handleLogout = () => {
        localStorage.removeItem("smartInboxer");
        setUserInfo(null);
        navigate("/login-new");
    }
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="bg-white shadow-md rounded-2xl p-8 w-full max-w-md">
                <h1 className="text-3xl font-bold text-gray-800 mb-4">
                    Home, hello {userInfo?.user_id}
                </h1>
                <p className="text-gray-600 mb-6">
                    Welcome to your dashboard. Start by logging in or integrating your account.
                </p>
                <button
                    onClick={handleLogout}
                    className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-xl transition duration-200"
                >
                    Logout
                </button>
            </div>
        </div>
    );
}
