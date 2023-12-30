import React, { useState } from 'react'
import { Link , useNavigate } from 'react-router-dom'
import ThemeToggle from './ThemeToggle'
import { HiOutlineMenu , HiOutlineX } from "react-icons/hi";
import { UserAuth } from '../context/AuthContext'
const Navbar = () => {
  const [open, setOpen] = useState(false)
  const { user, logout } = UserAuth()
  const navigate = useNavigate()
  const handleClick = () => {
    setOpen(!open)
  }
  const handleSignOut = async () => {
    try {
      await logout()
      navigate('/')
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className='rounded-div flex justify-between items-center h-20 font-bold'>
      <Link to={'/'}>
        <h1 className='text-2xl'>Cryptobase</h1>
      </Link>
      <div className='hidden md:block'>
        <ThemeToggle />
      </div>
      {user?.email ? (
        <div>
          <Link to={'/account'} className='p-4 hover:text-accent'>Account</Link>
          <button onClick={handleSignOut} className='bg-button text-btnText px-5 py-2 ml-2 rounded-2xl hover:shadow-2xl'>Sign Out</button>
        </div>
      ): (
        <div className='hidden md:block'>
        <Link className='p-4 hover:text-accent' to={'/signin'}>Sign In</Link>
        <Link className='bg-button text-btnText px-5 py-2 rounded-2xl hover:shadow-2xl' to={'/signup'}>Sign Up</Link>
      </div>
      )
    }
      <div onClick={handleClick} className='block md:hidden cursor-pointer z-10'>
       {open ? (<HiOutlineX/>) : (<HiOutlineMenu/>)}
      </div>
      {/* Mobile menu */}
      <div className={open ? 'md:hidden fixed left-0 top-20 flex flex-col items-center justify-between w-full h-[90%] bg-primary ease-in duration-300 z-10' : 'fixed left-[-100%] top-20 h-[90%] flex flex-col items-center justify-between ease-in duration-300'}>
        <ul className='w-full p-4'>
          <li className='border-b py-6'>
            <Link onClick={handleClick} to={'/'}>Home</Link>
          </li>
          <li className='border-b py-6'>
            <Link onClick={handleClick} to={'/account'}>Account</Link>
          </li>
          <li className='py-6'>
            <ThemeToggle/>
          </li>
        </ul>
        <div className='flex flex-col w-full p-4'>
          <Link onClick={handleClick} to={'/signin'}><button className='w-full my-2 p-3 bg-primary text-primary border border-secondary rounded-2xl shadow-xl'>Sign In</button> </Link>
          <Link onClick={handleClick} to={'/signup'}><button className='w-full my-2 p-3 bg-button text-btnText rounded-2xl shadow-xl'>Sign Up</button></Link>
        </div>
      </div>
    </div>
  )
}

export default Navbar
