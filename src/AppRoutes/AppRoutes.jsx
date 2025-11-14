import React from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom" // Use 'react-router-dom' for imports
// NOTE: I am fixing the file paths by assuming the components 
// are located within the same directory as App.jsx, or in a flat structure 
// if the previous paths were using relative addressing from a deeper level.
// If the components are in sibling folders, we must adjust the paths below.
// I will assume a standard structure for now, where these paths should be relative 
// to the root of the source directory, or adjust the path depth.

// --- Fixed Imports ---
import AuthLayout from "../AuthPage/AuthLayout" // Assuming AuthLayout is a sibling component
import SignUp from "../AuthPage/SignUp"; // Assuming SignUp is a sibling component
import Login from "../AuthPage/Login"; // Assuming Login is a sibling component
import VerifyOTP from "../AuthPage/VerifyOTP"; // Assuming VerifyOTP is a sibling component
import PasswordUpdated from "../AuthPage/PasswordUpdated"; // Assuming PasswordUpdated is a sibling component

import Footer from "../sections/Footer/Footer" // Keeping structure for sections
import Header from "../sections/Header/Header" // Keeping structure for sections
import Role from "../ChooseRole/Role" // Assuming Role is now in a simple path for demonstration/testing
import LandingPage from "../Pages/LandingPage";
import Hero from '../Pages/JOBSEEKER/Hero'
import JSLandingPage from '../Pages/JOBSEEKER/LandingPage/JSLandingPage'
import JSHomePage from '../Pages/JOBSEEKER/HomePage/JSHomePage'
import JobLayout from "../Pages/JOBSEEKER/JobPage/JobLayout";

function AppRoutes(){
  return (
    <>
      <BrowserRouter>
        <Routes>
           
          <Route path ="/" element={<LandingPage/>}/>
          <Route path="auth" element ={<AuthLayout/>}>
            <Route path="register" element={<SignUp/>}/>
            <Route path="login" element={<Login/>}/>
            <Route path="verify-otp" element={<VerifyOTP/>}/>
            <Route path="password-updated" element={<PasswordUpdated/>}/>
            <Route path="verify-account" element={<VerifyOTP/>}/> 
          </Route>
          
          <Route path="choose-role" element={<Role/>}/>

          
          <Route path="jobs" element={<Hero/>} >
             <Route index element={<JSLandingPage/>}/>
             <Route path="home" element ={<JSHomePage/>}/>
             <Route path ="jobs" element={<JobLayout/>}/>
          </Route>
          <Route path="employer-dashboard" element={<div>Employer Dashboard Placeholder</div>} />

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default AppRoutes