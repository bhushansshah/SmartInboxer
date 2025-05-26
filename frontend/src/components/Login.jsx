// Component for login
import React from 'react'
import {useGoogleLogin} from "@react-oauth/google"
import { googleLoginAuth } from '../api';
import {useNavigate} from 'react-router-dom'
function Login() {
    const navigate = useNavigate();

    const responseGoogle = async (responses) => {
        try{
            const {code} = responses;
            
            const response = await googleLoginAuth(code);
            console.log("Response from backend: ", response);

            const token = response.token;
            const user = response.user;
            if (token){
                localStorage.setItem("mind-mate", JSON.stringify({token, user}));
                navigate("/dashboard");
            }
            else{
                alert("Login failed");
            }

        }
        catch(error){
            console.log("Error while google oauth: error", error)
        }
    }
    const googleLogin = useGoogleLogin({
        onSuccess: responseGoogle,
        onError: responseGoogle,
        flow: "auth-code",
    })
    return (
        <div>
            <button onClick={googleLogin}>Google Login</button>
        </div>
    )
}

export default Login