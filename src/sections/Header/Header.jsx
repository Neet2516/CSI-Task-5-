import React from 'react'
import logo from '../../assets/logo.png'

const Header = ({className}) => {
  return (
    <div className={className}>
    <div className='w-full h-[8vh] libre-bold flex items-center justify-center bg-[#f1f5fa] text-2xl text-[#15294b]'>
        <img src={logo}  className='h-3/4 w-auto' alt="" /> 
        NextStep
    </div>
    </div>

    
  )
}

export default Header
