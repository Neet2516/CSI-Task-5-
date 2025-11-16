import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaRegEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import logo from '../assets/logo.png';
import googleIcon from '../assets/login/google.png'; 
import facebookIcon from '../assets/login/facebook.png'; 
import appleIcon from '../assets/login/apple.png'; 
import {jwtDecode} from "jwt-decode";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [passwordShown, setPasswordShown] = useState(false);
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(null); 
  
  const navigate = useNavigate(); 

  const API_URL = 'https://job-portal-my15.onrender.com/api/auth/login';

  const togglePasswordVisibility = () => {
    setPasswordShown(!passwordShown);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      let data = {};
      try {
        data = await response.json();
      } catch (e) {
        data.message = "An unexpected server response was received.";
      }

      if (response.ok) {
        console.log("Login successful. Received data:", data);
        const token = (data.accessToken);
        localStorage.setItem("accessToken",data.accessToken)
        const decoded = jwtDecode(token);
        console.log(JSON.stringify(decoded));
        localStorage.setItem("accessData",JSON.stringify(decoded));
        alert("Login Successful! Ready to redirect.");
        if(decoded.role=="JOBSEEKER"){
          navigate("/jobs");
        }

      } else {
        console.error("Login Error:", data);
        setError(data.error || data.message || 'Login failed. Please verify your credentials.');
      }
    } catch (err) {
      console.error("Network error during login:", err);
      setError('Cannot connect to the server. Check your network.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex w-full lg:w-1/3 flex-col justify-center items-center min-h-screen bg-white p-4">
    <img src={logo} className= "h-12 w-12 "alt="" />
        <div className='flex flex-col my-8 '><div className=' text-[#15294B] text-center  font-bold space poppins-semibold text-[2rem] '>Your work people are here</div>
        <div className='text-black text-center text-1xl poppins-light'>Welcome back, Please enter your details</div></div>
      <div className="bg-[#f1f5fa] border border-[#c1c4c8] p-8 rounded-2xl shadow-xl max-w-md w-full">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">Login</h2>

        <form onSubmit={handleSubmit}>
          {/* Email Input */}
          <div className="mb-6">
            <label htmlFor="email" className="block text-[#a8adb7] text-sm font-semibold mb-2">
              Email
            </label>
            <div className="relative flex items-center border-b border-gray-300 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500 overscroll-x-scroll">
              <FaRegEnvelope className="text-black mr-3" />
              <input
                type="email"
                id="email"
                placeholder="Email"
                className="grow poppins-regular overflow-x-hidden flex-1 min-w-0 outline-none poppins-regular text-black"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-[#a8adb7] text-sm font-semibold mb-2">
              Password
            </label>
            <div className="relative flex items-center border border-gray-300 rounded-lg px-3 py-2 
                focus-within:ring-2 focus-within:ring-blue-500 
                w-full max-w-md mx-auto">

          <FaLock className="text-black mr-3 shrink-0" />
                      <input
            type={passwordShown ? "text" : "password"}
            id="password"
            placeholder="Password"
            className="flex-1 min-w-0 outline-none poppins-regular text-black"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
                    <button
            type="button"
            onClick={togglePasswordVisibility}
            className="ml-3 text-gray-500 hover:text-gray-700 focus:outline-none shrink-0"
          >
            {passwordShown ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex flex-col md:flex-row flex-center justify-center md:justify-between md:items-center mb-8 text-sm">
            <label htmlFor="rememberMe" className="flex items-center text-gray-700">
              <input
                type="checkbox"
                id="rememberMe"
                className="mr-2 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              Remember me
            </label>
            <a href="/forgot-password" className="text-blue-600 hover:underline font-medium">
              Forgot Password ?
            </a>
          </div>

          {/* Error Display */}
          {error && (
            <p className="text-red-500 text-center text-sm mb-4 font-medium">{error}</p>
          )}

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-[#15294B] text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300 disabled:bg-gray-400"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Log in'}
          </button>
        </form>

        {/* OR Divider */}
        <div className="relative flex items-center justify-center my-8">
          <span className="absolute left-0 right-0 h-px bg-gray-200"></span>
          <span className="relative  px-4 text-gray-500 text-sm">or continue with</span>
        </div>

        {/* Social Login Buttons */}
        <div className="flex justify-center space-x-4 mb-8">
          <button className="flex items-center justify-center w-12 h-12  border-gray-300 rounded-full hover:bg-gray-50 transition duration-300">
            <img src={facebookIcon} alt="Facebook" className="w-full h-full" />
          </button>
          <button className="flex items-center justify-center w-12 h-12  border-gray-300 rounded-full hover:bg-gray-50 transition duration-300">
            <img src={appleIcon} alt="Apple" className="w-full h-full" />
          </button>
          <button className="flex items-center justify-center w-12 h-12  border-gray-300 rounded-full hover:bg-gray-50 transition duration-300">
            <img src={googleIcon} alt="Google" className="w-full h-full" />
          </button>
        </div>

        {/* Sign Up Link */}
        <p className="text-center text-gray-600 text-sm">
          Don't have an account?{" "}
          <a onClick={() => navigate('/auth/register')} className="text-blue-600 hover:underline font-semibold cursor-pointer">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;