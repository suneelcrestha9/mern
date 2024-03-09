import React, { useEffect, useRef } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { signOutSuccess } from '../redux/userSlice'
import axios from 'axios'

export default function Navbar() {
    const displayRef = useRef()
    const {currentUser}= useSelector((state)=>state.user)
    const [show,setShow]=useState(false)
    const [searchTerm,setSearchTerm]=useState('')
    const location = useLocation()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [searchData,setSearchData]=useState([])
    const handelSignout= async()=>{
    try {
      dispatch(signOutSuccess())
      navigate('/login')
      setShow(false)
    } catch (error) {
      console.error(error.message)
    }
  }


  const checkOutsideBox=(e)=>{
    if(show && displayRef.current && !displayRef.current.contains(e.target)){
        setShow(!show)
    }
  }

  useEffect(()=>{
    document.addEventListener('mousedown',checkOutsideBox)
  })

  useEffect(()=>{
    const searchParams = new URLSearchParams(location.search)
    const searchFromUrl = searchParams.get('searchTerm')
    if(searchFromUrl){
        setSearchTerm(searchFromUrl)
    }
  },[])


  const handelSearch= async(e)=>{
    e.preventDefault()
    setSearchTerm(e.target.value)
    try {
        const res = await axios.get(`http://localhost:3000/api/v1/user/getallblogs?q=${searchTerm}`);
        if(res.status === 200){
            setSearchData(res.data)
            setSearchTerm(' ')
            navigate(`/search?searchTerm=${searchTerm}`, { state: { searchData: res.data } });
        }
    } catch (error) {
        console.log(error.message)
    }
    
  }
  
   
  return (
    <>
        <div className=" relative">
            <nav className=' bg-slate-400 flex flex-row justify-between'>
                <div className="text-xl  justify-around w-2/4 ">
                    <ul className=' flex cursor-pointer '>
                        <li className='px-4'><Link to="/">Home</Link></li>
                        {currentUser ? (
                            <li className='px-4'><Link to="/post">Make Post</Link></li>
                           
                        ):(
                            <li className='px-4'><Link to="/login">Log in</Link></li>
                        )}
                        <li>
                            <form onSubmit={handelSearch}>
                                <input type="search" name="" id=""  placeholder='search' onChange={(e)=>setSearchTerm(e.target.value)} />
                                <button type='submit'> Search</button>
                            </form>
                               
                            </li>
                    </ul>
                </div>
                <div className="">
                    <div className=" h-8 mr-10 aspect-square  rounded-full">
                        {currentUser ? (
                            <img src={currentUser.avatar} alt="" className=' rounded-full cursor-pointer object-cover w-full aspect-square' onClick={()=>setShow(!show)} />
                        ):(
                            <p>p</p>
                        )}
                    </div> 
                </div>
            </nav>
            {currentUser ? (
                <div ref={displayRef} className={`dropdown bg-orange-100 w-max rounded-md absolute right-10 transition ease-in-out  ${show ? 'flex' : 'hidden'}`}>
                <ul className='px-4 py-2'>
                    <li className='pt-1 cursor-pointer '><Link to='/dashboard?tab=profile'>{currentUser && currentUser.fullName}</Link></li>
                    <li className='pt-1 '>{currentUser && currentUser.email}</li>
                    <li className='pt-1 cursor-pointer' onClick={handelSignout}>Log out</li>
                    <li><Link to='/post'>Make Post</Link></li>
                </ul>
            </div>
            ):(
                <div className=""></div>
            )}
        </div>
    </>
  )
}
