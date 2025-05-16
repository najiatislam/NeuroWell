import React from 'react'
import Header from '../components/Header'
import SpecialityMenu from '../components/SpecialityMenu'
import TopDoctors from '../components/TopDoctors'
import Banner from '../components/Banner'
import Emergency from '../components/Emergency'
import Journal from '../components/Journal'




const Home = () => {
  return (
    <div>
        
        <Header/>
        <Banner/>
        {/* <SpecialityMenu/> */}
        <Emergency/>
        <Journal/> 
        {/* <TopDoctors/> */}
        
        
            

    </div>
  )
}

export default Home
