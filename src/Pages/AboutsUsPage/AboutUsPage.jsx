import React, { useEffect } from 'react'
import background from './background.png'
import left from './assets/left.png'
import right from './assets/right.png'
import arrow from './assets/arrow.png'
import { MdDone } from "react-icons/md";
import { useNavigate } from 'react-router';
import About from './About'
import Header from '../../sections/Header/Header'
import Footer from '../../sections/Footer/Footer'
import gsap from 'gsap'
const AboutUsPage = () => {
  useEffect(() => {
    let t1 = gsap.timeline();
    t1.fromTo(".img1",{y:300,opacity:0},{y:0,opacity:1,duration:1,stagger:0.3});
    t1.fromTo(".img2",{y:-1000,opacity:0},{y:0,opacity:1,duration:1,stagger:0.3});
    }, []);
  
  return (
    <div>
      <Header/>
      <div className='w-full relative flex min-h-[900px]' style={{ backgroundImage: `url(${background})` }}>
          <div className='hidden md:block w-1/3 '>
              <img  src={left} alt="" className="absolute img1 top-0 w-1/4 " />
          </div>
          <div><About/></div>
          <div className='hidden md:block w-1/3  '>
                  <img src={right}  className="absolute img2 bottom-0 right-0 w-1/4" alt="" />
            </div>
        </div>
        <Footer/>
    </div>
  )
}

export default AboutUsPage
