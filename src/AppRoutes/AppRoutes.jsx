import React from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom" // Use 'react-router-dom' for imports


// --- Fixed Imports ---
import AuthLayout from "../AuthPage/AuthLayout" // Assuming AuthLayout is a sibling component
import SignUp from "../AuthPage/SignUp"; // Assuming SignUp is a sibling component
import Login from "../AuthPage/Login"; // Assuming Login is a sibling component
import VerifyOTP from "../AuthPage/VerifyOTP"; // Assuming VerifyOTP is a sibling component
import PasswordUpdated from "../AuthPage/PasswordUpdated"; // Assuming PasswordUpdated is a sibling component

import Footer from "../sections/Footer/Footer" // Keeping structure for sections
import Header from "../sections/Header/Header" // Keeping structure for sections
import Role from "../ChooseRole/Role" // Assuming Role is now in a simple path for demonstration/testing
import LandingPage from "../Pages/LandingPage/LandingPage";
import Hero from '../Pages/JOBSEEKER/Hero'
import JSLandingPage from '../Pages/JOBSEEKER/LandingPage/JSLandingPage'
import JSHomePage from '../Pages/JOBSEEKER/HomePage/JSHomePage'
import JobLayout from "../Pages/JOBSEEKER/JobPage/JobLayout";
import SubmitPage from "../Pages/JOBSEEKER/SubmitPage/SubmitPage";
import ProfilePage from "../Pages/JOBSEEKER/ProfilePage/ProfilePage";
import AboutUsPage from "../Pages/AboutsUsPage/AboutUsPage";
import Dashboard from "../Pages/JOBSEEKER/Dashboard/Dashboard";
import JobRecruiterOutlet from '../Pages/JOBRECRUITER/Hero'
import JRLandingPage from "../Pages/JOBRECRUITER/LandingPage/JRLandingPage";
import JRHomePage from '../Pages/JOBRECRUITER/HomePage/JRHomePage'
import JRSubmitPage from '../Pages/JOBRECRUITER/SubmitPage/SubmitPage'
import JRProfilePage from '../Pages/JOBRECRUITER/ProfilePage/ProfilePage'

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

          
          <Route path="about" element={<AboutUsPage/>}/>
          <Route path="jobs" element={<Hero/>} >
             <Route index element={<JSLandingPage/>}/>
             <Route path="home" element ={<JSHomePage/>}/>
             <Route path ="jobs" element={<JobLayout/>}/>
             <Route path="submit" element={<SubmitPage/>}/>
             <Route path="profile" element={<ProfilePage/>}/>
             <Route path="dashboard" element={<Dashboard/>}/>
             <Route path="applications" element={<div>Applications Page</div>} />
            <Route path="saved-jobs" element={<div>Saved Jobs Page</div>} />

          </Route>
          <Route path="recruiter" element={<JobRecruiterOutlet/>} >
            <Route path="" element={<JRLandingPage/>}></Route>
            <Route path="home"  element={<JRHomePage/>}/>
            <Route path="submit" element={<JRSubmitPage/>}/>
            <Route path="profile" element={<JRProfilePage/>}/>


          </Route>

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default AppRoutes