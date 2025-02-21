import React from 'react'
import Header from '../components/Header'
import Hero from '../components/home/Hero'
import Footer from '../components/Footer'
import Sidebar from '../components/Sidebar'

const Home = () => {
  return (
    <section className='w-full h-full bg-dark_theme flex justify-center font-bai'>
          <Sidebar/>
          <Hero/>
    </section>
  )
}

export default Home
