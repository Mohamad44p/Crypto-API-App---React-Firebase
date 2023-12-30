import React from 'react'
import {FaTwitter , FaFacebook , FaReddit , FaGithub , FaInstagram, FaTiktok } from 'react-icons/fa'
import ThemeToggle from './ThemeToggle'
const Footer = () => {
  return (
    <div className='rounded-div mt-8 pt-8 text-primary'>
      <div className='grid md:grid-cols-2'>
        <div className='flex justify-evenly w-full md:max-w-[300px] uppercase'>
          <div>
            <h2 className='font-bold'>Support</h2>
            <ul>
              <li className='text-sm py-2 hover:text-accent cursor-pointer'>Help Center</li>
              <li className='text-sm py-2 hover:text-accent cursor-pointer'>Contact Us</li>
              <li className='text-sm py-2 hover:text-accent cursor-pointer'>API Status</li>
              <li className='text-sm py-2 hover:text-accent cursor-pointer'>Documentation</li>
            </ul>
          </div>
          <div>
            <h2 className='font-bold'>Info</h2>
            <ul>
              <li className='text-sm py-2 hover:text-accent cursor-pointer'>About Us</li>
              <li className='text-sm py-2 hover:text-accent cursor-pointer'>Careers</li>
              <li className='text-sm py-2 hover:text-accent cursor-pointer'>Invest</li>
              <li className='text-sm py-2 hover:text-accent cursor-pointer'>Legal</li>
            </ul>
          </div>
        </div>
        <div className='text-right'>
          <div className='w-full flex justify-end'>
            <div className='w-full md:w-[300px] py-4 relative'>
              <div className='flex justify-center md:justify-end py-4 md:py-0 md:pb-4 mt-[-1rem]'>
                <ThemeToggle/>
              </div>
              <p className='text-center md:text-right'>Sign up to crypto news</p>
              <div className='py-4'>
                <form>
                  <input className='bg-primary border-input w-full shadow-xl md:w-auto mr-2 rounded-2xl p-2 focus:outline-none' type="email" placeholder="Email Address" />
                  <button className='bg-button text-btnText px-4 py-2 my-2 w-full md:w-auto rounded-2xl hover:shadow-2xl'>Sign Up</button>
                </form>
              </div>
              <div className='flex text-accent justify-between py-4 cursor-pointer'>
                <FaInstagram />
                <FaTiktok/>
                <FaTwitter />
                <FaFacebook />
                <FaGithub />
              </div>
            </div>
          </div>
        </div>
      </div>
      <p className='text-center py-4'>Copyright 2024 - MohamadAbuOmar</p>
    </div>
  )
}

export default Footer
