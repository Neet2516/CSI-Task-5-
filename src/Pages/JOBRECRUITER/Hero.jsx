import React, { useState,useEffect } from 'react'
import {Outlet} from 'react-router'
import Nav from '../../sections/Header/JOBRECRUITER/JobrecruiterNavbar'
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
