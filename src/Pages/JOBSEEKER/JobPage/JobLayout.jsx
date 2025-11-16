import React from 'react'
import img1  from './assets/main.png'
import img2  from './assets/main2.png'
import SearchFilter from './SearchFilter'
import JobCard from './JobCard'
import building from './assets/building.png'
import companies from './assets/companies.png'
const JobLayout = () => {
    const Jobavail = () => {
      const cards = [];
      for (let i = 0; i < 8; i++) {
        cards.push(<JobCard key={i} />);
      }
      return <>{cards}</>;
    };

  return (
    <div>
      <div className='relative h-50 md:h-150' style ={{backgroundImage: `url(${img1})`}}>
        <img src={img2} className="h-full w-full" alt=""/>
      </div>
      <div>
        <div className='flex justify-between items-center'> 
            <h3 className='bg-white my-8 libre-bold font-bold text-2xl '>Recent Jobs Available</h3>
            <div className='hover:text-blue-500 cursor-pointer my-8  '>See more</div>
        </div>
        
        <div className='flex flex-col md:flex-row gap-5'>
            <div className='md:w-1/4 flex flex-col '>
                <SearchFilter/>
            </div>
            <div className='md:w-3/4 pr-10'>
                <Jobavail />
                <div className='text-gray-500 flex mt-5 text-sm justify-between mr-2'>
                    <h1 className='text-xl  libre-regular'>Showing x of 10 results</h1>
                    <button className='p-2 border'>Sort by latest  ^</button>
                </div>
                <div className='
                flex justify-between mt-2 mr-2'>
                    <button className="p-2 w-8 h-8 text-white bg-blue-950 text-center flex items-center justify-center">1</button>
                    <button className='p-1 pr-4 border-gray-800  border  rounded-lg text-gray-500
                    '>{`Next >`}</button>
                </div>
                <img src={building}  className="mt-10 h-50 sm:h-80 w-full mr-2" alt="" />
                
            </div>
        </div>
        <div className='my-5 flex  flex-col items-center justify-center w-full'>
                    <h1 className=' text-3xl  libre-bold text-gray-500 mb-3' >Get hired in top companies</h1>
                    <img src={companies} alt="" className='w-3/4' />
                </div>
      </div>
    </div>
  )
}

export default JobLayout
