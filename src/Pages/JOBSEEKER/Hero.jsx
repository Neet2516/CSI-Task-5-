import React, { useState,useEffect } from 'react'
import {Outlet} from 'react-router'
import Nav from '../../sections/Header/JOBSEEKER/JobseekerNavbar'
import SNav from '../../sections/Header/Header'
import Footer from '../../sections/Footer/Footer'

const Hero = () => {
  const [isWide, setIsWide] = useState(window.innerWidth > 768);

  useEffect(() => {
    const handleResize = () => setIsWide(window.innerWidth > 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <>
   {isWide ? <Nav /> : <SNav />}
    

    <Outlet/>
    <Footer/>
    
    </>

  )
}

export default Hero
