import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signOutSuccess } from '../redux/userSlice'
import { useDispatch} from 'react-redux'

export default function DashboardSidebar() {
  const navigate = useNavigate()
    const dispatch = useDispatch()
    const handelSignout= async()=>{
    try {
      dispatch(signOutSuccess())
      navigate('/login')
    } catch (error) {
      console.error(error.message)
    }
  }
  return (
    <>
    <div className="">
      <Link to='/dashboard?tab=profile'>
          <div className=" bg-gray-200 text-xl rounded-md cursor-pointer font-serif text-center m-2 px-4 py-1">
              Profile
          </div>
       </Link>
       <Link to='/dashboard?tab=posts'>
          <div className=" bg-gray-200 text-xl rounded-md cursor-pointer font-serif text-center m-2 px-4 py-1" >
            Posts
          </div>
      </Link>
      <Link to='/dashboard?tab=logout'>
          <div className=" bg-gray-200 text-xl rounded-md cursor-pointer font-serif text-center m-2 px-4 py-1" onClick={handelSignout}>
            Logout
          </div>
      </Link>
    </div>
    </>
  )
}
