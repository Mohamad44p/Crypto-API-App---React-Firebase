import React, { useState } from 'react'
import { AiFillLock, AiOutlineMail } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import { UserAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
const Signup = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const { signUp } = UserAuth()

  const handelSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      await signUp(email, password)
      navigate('/')
    } catch (e) {
      setError(e.message)
      console.log(e.message)
    }
  }
  return (
    <div>
    <div className='max-w-[400px] mx-auto min-h-[600px] px-4 py-20'>
      <h1 className='text-2xl font-bold'>Sign Up</h1>
      {error ? <p className='bg-red-400 p-3 my-2'>{error}</p> : null}
      <form onSubmit={handelSubmit}>
        <div className='my-4'>
          <label>Email</label>
          <div className='my-2 w-full relative rounded-2xl shadow-xl'>
            <input onChange={(e) => setEmail(e.target.value)} className='w-full p-2 bg-primary border-[#edf2f7] border rounded-2xl' type="email" />
            <AiOutlineMail className='absolute top-3 right-2 text-[#9CA3AF]'/>
          </div>
        </div>
        <div className='my-4'>
          <label>Password</label>
          <div className='my-2 w-full relative rounded-2xl shadow-xl'>
            <input onChange={(e) => setPassword(e.target.value)} className='w-full p-2 bg-primary border-[#edf2f7] border rounded-2xl' type="password" />
            <AiFillLock className='absolute top-3 right-2 text-[#9CA3AF]'/>
          </div>
        </div>
        <button className='w-full my-2 p-3 bg-button text-btnText rounded-2xl shadow-xl'>Sign up</button>
      </form>
      <p className='my-4'>Already have an account? <Link className='text-accent' to="/signin">Sign in</Link></p>
    </div>
  </div>
  )
}

export default Signup
