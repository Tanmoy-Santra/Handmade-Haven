import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import model1 from './Assets/model1.png';
import model2 from './Assets/model2.png';
import model3 from './Assets/model3.png';
import model4 from './Assets/model4.png';

const About = () => {
  return (
    <>
      <Navbar />
      <div className="relative max-w-screen-xl p-4 px-4 mx-auto my-20 bg-white sm:px-6 lg:px-8 py-10">
        <div className="relative">
          <div className="lg:grid lg:grid-flow-row-dense lg:grid-cols-2 lg:gap-8 lg:items-center">
            <div className="ml-auto lg:col-start-2 lg:max-w-2xl">
              <p className="text-base font-semibold leading-6 text-indigo-500 uppercase">
                About Us
              </p>
              <h4 className="mt-2 text-2xl font-extrabold leading-8 text-gray-900 sm:text-3xl sm:leading-9">
                Welcome to Handmade Haven
              </h4>
              <p className="mt-4 text-lg leading-6 text-gray-500">
                Handmade Haven is a place where creativity meets craftsmanship. We specialize in creating unique handmade crafts that bring joy and beauty to everyday life. Our team is dedicated to crafting high-quality products with a personal touch, ensuring each piece is crafted with care and attention to detail.
              </p>
              <ul className="gap-6 mt-8 md:grid md:grid-cols-2">
                <li className="mt-6 lg:mt-0">
                  <div className="flex">
                    <span className="flex items-center justify-center flex-shrink-0 w-6 h-6 text-green-800 bg-green-100 rounded-full">
                      <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </span>
                    <span className="ml-4 text-base font-medium leading-6 text-gray-500">
                      Live modifications
                    </span>
                  </div>
                </li>
                <li className="mt-6 lg:mt-0">
                  <div className="flex">
                    <span className="flex items-center justify-center flex-shrink-0 w-6 h-6 text-green-800 bg-green-100 rounded-full">
                      <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </span>
                    <span className="ml-4 text-base font-medium leading-6 text-gray-500">
                      Data tracker
                    </span>
                  </div>
                </li>
                <li className="mt-6 lg:mt-0">
                  <div className="flex">
                    <span className="flex items-center justify-center flex-shrink-0 w-6 h-6 text-green-800 bg-green-100 rounded-full">
                      <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </span>
                    <span className="ml-4 text-base font-medium leading-6 text-gray-500">
                      24/24 support
                    </span>
                  </div>
                </li>
                <li className="mt-6 lg:mt-0">
                  <div className="flex">
                    <span className="flex items-center justify-center flex-shrink-0 w-6 h-6 text-green-800 bg-green-100 rounded-full">
                      <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </span>
                    <span className="ml-4 text-base font-medium leading-6 text-gray-500">
                      Free tips to improve work time
                    </span>
                  </div>
                </li>
              </ul>
            </div>
            <div className="relative mt-10 lg:-mx-4 lg:mt-0 lg:col-start-1">
              <div className="relative space-y-4">
                <div className="flex items-end justify-center space-x-4 lg:justify-start">
                  <img className="w-32 rounded-lg shadow-lg md:w-56 bg-color-model" src={model2} alt="1" />
                  <img className="w-40 rounded-lg shadow-lg md:w-64 bg-color-model" src={model4} alt="2" />
                </div>
                <div className="flex items-start justify-center ml-12 space-x-4 lg:justify-start">
                  <img className="w-24 rounded-lg shadow-lg md:w-40 bg-color-model" src={model1} alt="3" />
                  <img className="w-32 rounded-lg shadow-lg md:w-56 bg-color-model" src={model3} alt="4" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default About;
