import React, { useState } from 'react'
import { AiFillLock, AiOutlineMail } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import { UserAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
const Signin = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const { signIn } = UserAuth()

  const handelSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      await signIn(email, password)
      navigate('/account')
    } catch (e) {
      setError(e.message)
      console.log(e.message)
    }
  }
  return (
    <div>
      <div className='max-w-[400px] mx-auto min-h-[600px] px-4 py-20'>
        <h1 className='text-2xl font-bold'>Sign In</h1>
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
          <button className='w-full my-2 p-3 bg-button text-btnText rounded-2xl shadow-xl'>Sign in</button>
        </form>
        <p className='my-4'>Don't have an account? <Link className='text-accent' to="/signup">Sign up</Link></p>
      </div>
    </div>
  )
}

export default Signin
