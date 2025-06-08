import { useState } from "react";
import {useGoogleLogin} from "@react-oauth/google"
import { googleLoginAuth } from "../api/auth";
import { primitiveLoginAuth } from "../api/auth"
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  
  const navigate = useNavigate();

  const primitiveLogin = async () => {
    if(username == "" || password == ""){
      alert("Username or password fields is/are empty.");
      return;
    }
    const response = await primitiveLoginAuth(username, password);
    console.log(response)

    if(response.status == "error"){
      alert(response.message);
      return;
    }

    const loginToken = response.login_token;
    const user = response.user;
    if(loginToken != "" && user != null){
      localStorage.setItem("smart-inboxer", JSON.stringify({login_token: loginToken, user: user}));
      navigate("/home")
    }
  }

  const responseGoogle = async (responses) => {
          try{
              const {code} = responses;
              
              const response = await googleLoginAuth(code);
              console.log("Response from backend: ", response);
  
              if(response.status == "error"){
                alert(response.message);
                return;
              }
              const loginToken = response.login_token;
              const user = response.user;
              if(loginToken != null && user != null){
                localStorage.setItem("smart-inboxer", JSON.stringify({
                  login_token: loginToken,
                  user: user
                }))
                navigate("/home")
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
    <div className="min-h-screen bg-gradient-to-br from-zinc-900 to-gray-800 flex items-center justify-center">
      <div className="w-full max-w-md bg-zinc-950 p-8 rounded-2xl shadow-xl border border-zinc-800">
        <h1 className="text-3xl font-bold text-white text-center mb-6">Login</h1>

        <input
          type="username"
          placeholder="Username"
          className="w-full mb-4 px-4 py-3 rounded-xl bg-zinc-800 text-white placeholder-gray-400 border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-purple-600"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-6 px-4 py-3 rounded-xl bg-zinc-800 text-white placeholder-gray-400 border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-purple-600"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button 
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-xl transition duration-200"
          onClick={primitiveLogin}
        >
          Log In
        </button>

        <div className="my-6 text-center text-gray-400">or</div>

        <button 
          className="w-full flex items-center justify-center gap-2 bg-white text-black font-semibold py-3 rounded-xl hover:bg-gray-100 transition duration-200"
          onClick={googleLogin}
        >
          <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="h-5 w-5" />
          Log in with Google
        </button>

        <p className="mt-6 text-sm text-center text-gray-500">
          Don’t have an account? <a href="#" className="text-purple-500 hover:underline">Sign Up</a>
        </p>
      </div>
    </div>
  );
}
