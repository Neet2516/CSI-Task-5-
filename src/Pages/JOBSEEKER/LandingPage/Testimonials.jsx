import React from 'react'
import testimonials from "./assets/testimonails.png"
const Testimonials = () => {
  return (
    <div className='bg-[#f1f5fa] p-10'>
        <center className='text-2xl libre-bold'>Testimonials</center>
        <div className='flex justify-evenly items-center '>
            <div className='flex libre-bold flex-col items-left w-full md:max-w-1/3 mt-5 justify-center'>
                <h2 className='text-xl '>What our clients are saying</h2>
                <p className='libre-regular my-10 text-sm'>"I had the privilege of using NextStep to search for employment, and it exceeded my expectations. The platform's user-friendly features and the vast array of job listings made my job search a success. I endorse Job Hunt wholeheartedly."</p>

                <h2>Julie Roy</h2>
                <h1 className='libre-regular'>Product Manager</h1>
            </div>
            <div> <img src={testimonials} alt=""  className='h-100 hidden md:block'/></div>
        </div>
      
    </div>
  )
}

export default Testimonials
