import React from 'react'
import background from './background.png'
import left from './assets/left.png'
import right from './assets/right.png'
import arrow from './assets/arrow.png'
import { MdDone } from "react-icons/md";
import { useNavigate } from 'react-router'

const SubmitPage = () => {
    const navigate =useNavigate();
  return (
   <div className='w-full relative flex min-h-[900px]' style={{ backgroundImage: `url(${background})` }}>
    <div className='hidden md:block w-1/3 '>
        <img src={left} alt="" className="absolute top-0 w-1/4 " />
    </div>
    <div className='w-full md:w-1/3 flex flex-col jsutify-center px-10 '>
    
    
    <div>
    <div className='flex flex-col  justify-center items-center '>
        <img src={arrow} className="w-full mb-5" alt="" />
        <h2 className='poppins-semibold text-2xl'>Your Application Has Benn</h2>
        <h3 className="text-green-700 text-2xl poppins-semibold">Submitted !</h3>
    </div>
    <div>
        <div><div className='flex gap-2 pt-8'><div className='border-green-400 border-2  rounded-full text-xl h-fit w-fit'><MdDone className='h-5 w-5 text-green-400'/></div> You will get an email confirmation at xyz@gmail.com</div></div>
        <div className='flex gap-2 py-8  border-b-gray-400 border-b '><div className='border-green-400 border-2  rounded-full h-fit w-fit text-xl'><MdDone className='h-5 w-5 text-green-400'/></div>This employer typically responds to applications within .</div>
        </div>
        
    </div>
    <div>
        <div className='poppins-bold text-2xl font-bold pt-8 pb-5'>Keep track of your applications</div>
        <p className='text-sm poppins-light font-bold mb-10'>You will receive a status update in an email from <pre className='text-gray-500 inline'>NextStep</pre> within a few weeks of submitting your application. In the meantime, you can view and track all your applications in the <pre className='text-gray-500 inline'>NextStep</pre> <pre className='text-green-500 inline'>Jobs</pre> section at any time.</p>

        <span className='border-b  border-b-purple-600 font-semibold my-10'><a href="" className='text-purple-600'>Check yoour appliactions on Recent Activities</a></span>

        <center><button className='bg-blue-950 hover:bg-blue-200 text-white poppins-regular px-8 py-3 my-10' onClick={()=>{
            navigate("/jobs/jobs")
        }}>Return to a job search</button></center>
    
    </div>
    </div>

    <div className='hidden md:block w-1/3  '>
        <img src={right}  className="absolute bottom-0 right-0 w-1/4" alt="" />
    </div>
</div>

  )
}

export default SubmitPage
