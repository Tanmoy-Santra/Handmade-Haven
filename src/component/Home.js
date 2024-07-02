import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import model1 from './Assets/model3.png'
import model2 from './Assets/model1.png'
import model3 from'./Assets/model4.png'
import model5 from './Assets/model5.png'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div>
        <Navbar/>
        <div class="bg-white overflow-hidden relative lg:flex lg:items-center">
    <div class="w-full py-12 px-4 sm:px-6 lg:py-16 lg:px-8 z-20">
        <h2 class="text-3xl font-extrabold text-black sm:text-4xl">
            <span class="block">
            Welcome to Handmade Haven
            </span>
        </h2>
        <p class="text-md mt-4 text-gray-500">
            TDiscover the beauty of unique, handcrafted items created with love and care. Each piece tells a story and adds a personal touch to your home and life.
        </p>
        <div class="lg:mt-0 lg:flex-shrink-0">
            <div class="mt-12 inline-flex rounded-md shadow">
                <Link to='/Product' type="button" class="py-2 px-4 bg-green-500 focus:ring-purple-500 focus:ring-offset-purple-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg btn-custom-color">
                    Explore Our Collection
                </Link>
            </div>
        </div>
    </div>
    <div class="flex items-center gap-8 p-8 lg:p-24">
        <img src={model1} class="w-1/2 rounded-lg bg-color-model" alt="Tree"/>
        <div>
            <img src={model2} class="mb-8 rounded-lg bg-color-model" alt="Tree"/>
            <img src={model3} class="rounded-lg bg-color-model" alt="Tree"/>
        </div>
    </div>
</div>

<div class="relative z-20 flex items-center bg-white dark:bg-gray-800 bg-custom-middle">
    <div class="container relative flex flex-col items-center justify-between px-6 py-8 mx-auto">
        <div class="flex flex-col">
            <h1 class="w-full text-4xl font-light text-center text-gray-800 uppercase sm:text-3xl dark:text-white">
                Enhance Your Home with Handmade Crafts
            </h1>
            <h2 class="w-full max-w-2xl py-8 mx-auto text-l font-light text-center text-gray-500 dark:text-white">
                NeHandmade crafts enrich homes with unique charm and personalization. They showcase meticulous craftsmanship and attention to detail, offering quality and authenticity that mass-produced items often lack. These crafts support local artisans, promote sustainability, and use eco-friendly materials, contributing to a more conscious lifestyle. They not only enhance home aesthetics but also tell stories of creativity and passion, adding warmth and character to living spaces.
            </h2>
            <div class="flex items-center justify-center mt-4">
                <Link to="/Product" class="px-4 py-2 mr-4 text-white uppercase bg-gray-800  text-md hover:bg-gray-900 btn-custom-color">
                    Get started
                </Link>
                
            </div>
        </div>
        
    </div>
</div>

      
      <Footer/>     
    </div>
  )
}

export default Home
