import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import DashboardProfile from '../components/DashboardProfile'
import DashboardSIdebar from '../components/DashboardSidebar';
import Login from '../pages/LogIn'
import Dashposts from '../components/Dashposts';


export default function Dashboard() {
  const location = useLocation()
  const [tab,setTab]=useState('')

  useEffect(()=>{
    const urlParams = new URLSearchParams(location.search)
    const tabFromUrl = urlParams.get('tab')
    if(tabFromUrl){
      setTab(tabFromUrl)
    }
  },[location.search])


  return (
    <>
    <div className="flex ">
      <div className=" bg-slate-300 w-60 min-h-screen">
        {/* sidebar */}
        <DashboardSIdebar/>
      </div>
    
    {/* rightside content of the dashboard */}
      <div className=" flex justify-center w-full">
        {tab === 'profile' && <DashboardProfile/>}
        {tab === 'logout' && <Login/>}
        {tab === 'posts' && <Dashposts/>}
      </div>
    </div>
    </>
  )
}
