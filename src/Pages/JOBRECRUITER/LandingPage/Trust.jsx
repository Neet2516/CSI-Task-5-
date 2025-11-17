import React from 'react'
import companies from './assets/companies.png'
const Trust = () => {
  return (
    <div className='flex flex-col mt-10'>
        <center>
            {/* <h1 className='text-2xl libre-bold mb-10'>We are trusted by the world's largest companies</h1> */}
            <img src={companies} className='mb-15' alt="" />
        </center>
    </div>
  )
}

export default Trust
