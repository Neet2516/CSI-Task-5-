import React from 'react'
import { CiBookmark } from "react-icons/ci";
import { FcGoogle } from "react-icons/fc";
import { BsBagPlus,BsClock } from "react-icons/bs";
import { PiWalletLight } from "react-icons/pi";
import { IoLocationOutline } from "react-icons/io5";
const JobCard = () => {
  return (
    <div className='p-2 mr-2 mt-3 border-b-0 border-l-0 border-r-0  rounded-lg hover:shadow-2xl'>
      <div className='flex  justify-between'><span className='bg-gray-200 my-2 rounded-lg'>10 min ago </span><span></span><CiBookmark/></div>
      <div className='text-[1.5rem]  libre-bold flex items-center font-semibold '><FcGoogle className='mr-2'/> Google</div>
      <div className='flex flex-col sm:flex-row justify-between items-center  my-5 '>
        <div className='flex justify-evenly  '>
            <div className='flex items-center mr-2'><BsBagPlus className='mr-2'/><span className='text-gray-500  text-sm'>Senior Product Designer</span></div>
            <div className='flex items-center mr-2'>
                <BsClock className='mr-2'/><span className='text-gray-500 text-sm'>Full time</span>
            </div>
            <div className='flex items-center mr-2'>
                <PiWalletLight className='mr-2'/><span className='text-gray-500 text-sm'>$40000-$42000</span>
            </div>
            <div className='flex items-center mr-2'>
                < IoLocationOutline className='mr-2'/><span className='text-gray-500 text-sm '>New-Delhi</span>
            </div>
        </div>
        <div><button className='bg-blue-950 text-white text-sm px-2 rounded-lg py-1 mr-2'>Job Details</button></div>
    </div>
    </div>
  )
}

export default JobCard
