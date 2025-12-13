import React, { useEffect, useState } from 'react'
import AppRoutes from './AppRoutes/AppRoutes'
import JobseekerNavbar from './sections/Header/JOBSEEKER/JobseekerNavbar'
import  {apiGet} from './Loader/service'
import Loader from './Loader/Loader'
import { Toaster } from 'react-hot-toast';

const App = () => {
    const [loading, setLoading] = useState(true);
    useEffect(() => {
      apiGet(setLoading).then(data => {
      });
    }, []);
    const render  =  ()=>{
    if(loading)return(<Loader/>)
      else return(<AppRoutes/>)
    }
    useEffect(()=>{
      render();
    },[loading]);

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      {render()}
    </>
  )
}

export default App
