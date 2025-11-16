import React, { useState,useEffect } from 'react'
import {Outlet} from 'react-router'
import Nav from '../../sections/Header/JOBSEEKER/JobseekerNavbar'
import SNav from '../../sections/Header/Header'
import Footer from '../../sections/Footer/Footer'

const Hero = () => {

  return (
    <>
    <Nav/>
    <Outlet/>
    <Footer/>
    </>

  )
}

export default Hero
