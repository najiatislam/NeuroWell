import React from 'react'
import Header from '../components/Header'
import SpecialityMenu from '../components/SpecialityMenu'
import Journal from '../components/Journal'
import Banner from '../components/Banner'
import Emergency from '../components/Emergency'


const Home = () => {
  return (
    <div>
      <Header/>
      <Banner/>
      <SpecialityMenu/>
      <Emergency/>
      <Journal/>


      
      
    </div>
  )
}

export default Home