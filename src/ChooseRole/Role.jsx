import React from 'react'
import { useLocation } from 'react-router-dom';
import Header from '../sections/Header/Header'
import Footer from '../sections/Footer/Footer'
import ChooseRole from './ChooseRole'

const Role = () => {
  const location = useLocation();
  const { email } = location.state || {};
  return (
    <div>  
        <Header/>
        <ChooseRole email={email} />
        <Footer/>
    </div>
  )
}

export default Role
