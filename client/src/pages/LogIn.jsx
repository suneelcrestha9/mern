import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import {useDispatch} from 'react-redux'
import {singInFailure ,signInStart ,singInSuccess} from '../redux/userSlice'
import { Link } from 'react-router-dom'
import Oauth from '../components/Oauth'


export default function LogIn() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [formData,setFormData]=useState({
    email: '',
    password: ''
  })
  const handelChange=(e)=>{
    setFormData({...formData,[e.target.id]:e.target.value})
  }

  const handelSubmit=async (e)=>{
    dispatch(signInStart())
    e.preventDefault()
    try {
      const res = await axios.post('http://localhost:3000/api/v1/user/login', formData);
      if (res.status === 200) {
        console.log("Log in success");
        // Navigate after successful sign up
        dispatch(singInSuccess(res.data))
        navigate('/');
      }
    } catch (error) {
      dispatch(singInFailure(error.message))
      console.log(error.message);
    }
  }
  return (
    <>
    <div className="flex justify-center">
      <div className=" h-96 w-80 mt-52 bg-slate-300 flex flex-col gap-4 items-center rounded-lg">
        <h2 className=' text-2xl mt-2 font-bold'>Log In</h2>

        <form className=' m-8 mb-0' onSubmit={handelSubmit}>
          <div className="mb-4">
            <input className='bg-gray-100 p-2 rounded-md ' type="email" placeholder='Email' id='email' onChange={handelChange} />
          </div>
          <div className="mb-4">
            <input className='bg-gray-100 p-2 rounded-md' type="password" placeholder='Password' id='password' onChange={handelChange} />
          </div>
         <div className=" w-full  flex justify-center">
            <button className='m-4 mb-0 bg-black text-white py-2 px-8 rounded-md text-center ' type='submit'> Submit</button>
         </div>
        </form>
        <Oauth/>
        <div className="">
          <h2>Don't have account?</h2>
          <div className="flex justify-center">
              <Link to='/signin' className=' text-blue-700  '>Sign in</Link>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}
