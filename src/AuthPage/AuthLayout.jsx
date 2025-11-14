import React from 'react'
import { Outlet} from 'react-router'

import left from '../assets/login/left.png' 
import right from '../assets/login/right.png'
const AuthLayout = () => {
  return (

    <>
    <div className='flex relative flex-col md:flex-row justify-center'>
      <div className='w-1/3 hidden lg:block '><img src={left} alt="" className='relative top-1/3'/></div>
        <Outlet/>
      <div className='w-1/3 hidden lg:block '><img src={right} alt="" className='relative top-1/3' /></div>
    </div>
    </>
  )
}

export default AuthLayout
