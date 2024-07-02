import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

const Contact = () => {
  return (
    <div>
      <Navbar />

      <div className="flex flex-col items-center justify-center min-h-screen">
        <form className="w-full max-w-sm space-y-3">
          <div className="w-full max-w-2xl px-5 py-10 bg-white rounded-lg shadow bg-custom-contact">
            <div className="mb-6 text-3xl font-light text-center text-gray-800 dark:text-white">
              Contact Us!
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <div className="relative">
                  <input
                    type="text"
                    id="contact-form-name"
                    className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    placeholder="Name"
                  />
                </div>
              </div>
              <div className="col-span-2">
                <div className="relative">
                  <input
                    type="text"
                    id="contact-form-email"
                    className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    placeholder="Email"
                  />
                </div>
              </div>
              <div className="col-span-2">
                <label className="text-gray-700" htmlFor="comment">
                  <textarea
                    className="w-full px-4 py-2 text-base text-gray-700 placeholder-gray-400 bg-white border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    id="comment"
                    placeholder="Enter your comment"
                    name="comment"
                    rows="5"
                    cols="40"
                  ></textarea>
                </label>
              </div>
              <div className="col-span-2 text-center">
                <button
                  type="submit"
                  className="py-2 px-4 bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg btn-custom-color"
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>

      <Footer />
    </div>
  );
};

export default Contact;
