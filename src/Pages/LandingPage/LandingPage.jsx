import React from 'react';
import Header from '../../sections/Header/Header';
import Footer from '../../sections/Footer/Footer';
import topimage from '../../assets/LandingPage/top-image.png';
import LandingPageFeatures from './LandingPageFeatures';
import secondimage from '../../assets/LandingPage/second-img.png'
import thirdimage from '../../assets/LandingPage/third-img.png'
import GetTheApp from './GetTheApp';
import { useNavigate } from 'react-router';
const LandingPage = () => {
    const navigate = useNavigate();
  return (
    <div> 
      <Header />
      
      <div className="relative">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${topimage})` }}
        ></div>

        <div className="absolute inset-0 bg-black opacity-50"></div>

        <div className=" relative z-10 text-white p-8 flex flex-col items-center justify-center">
          <h3 className="libre-regular mt-10 text-4xl font-bold">"Find Your Next Opportunity</h3><h3 className="libre-regular text-4xl font-bold mb-5">Hire Your Perfect Candidate"</h3>
          <p className='text-[1.5rem]'>"The all-in-one platform that connects top talent with leading companies."</p>

          <div className='flex flex-col md:flex-row justify-center items-center gap-20 my-10 text-white'>
            <button  className='bg-[#15294b] text-sm libre-regular py-5 px-25 rounded-lg transition-all duration-300 ease-out
               hover:bg-blue-600 cursor-pointer '  onClick={()=>{
                navigate("auth/login")
            }}>Log in</button>
            <button  className='bg-[#15294b] text-sm libre-regular py-5 px-25 rounded-lg transition-all duration-300 ease-out
               hover:bg-blue-600 cursor-pointer ' onClick={()=>{
                navigate("auth/register")
            }}>Sign Up</button>
          </div>
        </div>
      </div>
      <LandingPageFeatures/>
    <div className='mt-10 w-full'><img src={secondimage} className='w-full  bg-cover bg-center' alt="" /></div>
    <div className='my-10 bg-[#0E224D] flex items-center justify-between'>
        <GetTheApp/>
        <div className='hidden md:block md:w-3/5 h-full'><img src={thirdimage} alt="" /></div>
    </div>
      <Footer />
    </div>
  );
};

export default LandingPage;
