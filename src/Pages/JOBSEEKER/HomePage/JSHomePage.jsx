import React from 'react'
import post from './post.png'
import CompanyBlog from './CompanyBlog'

const JSHomePage = () => {
  return (
    <div>
        <center><img src={post} alt=""  className='w-3/4 h-40'/></center>
        <CompanyBlog/>
    </div>
  )
}

export default JSHomePage
