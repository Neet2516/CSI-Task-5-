import React from 'react'
import pattern from './pattern.png'
import { useNavigate } from 'react-router'
const Pattern = () => {
  const navigate=useNavigate();
  return (
    <div className='bg-[#f1f5fa] flex items-center justify-center p-10 '>
        <center><h1 className='libre-bold text-3xl mb-10'>How It Works</h1>
        <img src={pattern} className='mb-15'/>
        <button
                    className="py-3 px-10 text-lg font-semibold rounded-lg bg-[#15294B] text-white hover:bg-[#203a64] transition duration-300 cursor-pointer shadow-xl "
                    onClick={()=>{
                      navigate("/recruiter/home")
                    }}
                >
                    Post A Job Now
                </button>
        </center>


      
    </div>
  )
}

export default Pattern
