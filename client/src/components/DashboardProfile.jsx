import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRef } from 'react'
import { updateStart ,updateSuccess, updateFailure, signOutSuccess,deleteUser} from '../redux/userSlice'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


export default function DashboardProfile() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const fileUploadRef = useRef()
  const {currentUser}=useSelector((state)=>state.user)
  const [image,setImage]=useState(null)
  const [imageUrl,setImageUrl]=useState(null)
  const [errorMsg,setErrorMsg]=useState('')
  const [displayMsg,setDisplayMsg]=useState('')

  const [formData,setFormData]=useState({})
  const handelChange=(e)=>{
    setFormData({...formData,[e.target.id]:e.target.value})
    
  }
  const handelImageChnage=(e)=>{
    const file = e.target.files[0]
    if(file){
      if(file.type.startsWith('image')){
        setImage(file)
        setImageUrl(URL.createObjectURL(file))
        setFormData({...formData,[e.target.id]:e.target.files[0]})
        setErrorMsg('')
      }else{
        setErrorMsg('Please select a valid image')
        setImage(null)
        setImageUrl(null)
      }
    }
  }

  const handelUpdateChange = async (e) => {
    e.preventDefault();

    if(Object.keys(formData).length === 0) {
      return setErrorMsg('Make some changes');
    }

    try {
      setDisplayMsg('Updating...')
      setErrorMsg('')
      dispatch(updateStart());
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      };
      const res = await axios.put(`http://localhost:3000/api/v1/user/update/${currentUser._id}`,formData,config)
      if (res.status === 200) {
        alert('Update success')
        setDisplayMsg('')
        dispatch(updateSuccess(res.data));
      }
    } catch (error) {
      console.error(error.message);
      dispatch(updateFailure(error.message));
    }
  };

  
  const handelSignout= async()=>{
  try {
    dispatch(signOutSuccess())
    navigate('/login')
  } catch (error) {
    console.error(error.message)
  }
}


const handelDelete = async () => {
  try {
    const response = await axios.delete(`http://localhost:3000/api/v1/user/delete/${currentUser._id}`);

    if (response.status === 200) {
      console.log('User has been deleted successfully');
      dispatch(deleteUser(response.data))
    } else {
      console.log(`Unexpected response status: ${response.status}`);
      
    }
  } catch (error) {
    console.error('Error deleting user:', error.message);
   
  }
};

  

  return (
    <>
    <div className=" bg-slate-200 min-w-96 h-3/6 mt-40 rounded-md">
      {displayMsg ? (
        <div className=" text-center ">
          <p className=' text-sm '>{displayMsg}</p>
        </div>
      ):(
        <div className="text-center text-sm">
          Update
        </div>
      )}
      <form className='mt-8' onSubmit={handelUpdateChange}>
       <div className=" flex flex-col gap-4 w-full justify-center items-center">
        <input type="file" name="image"  id="avatar" accept='image/*' ref={fileUploadRef} onChange={handelImageChnage}  className=' hidden'/>
        <div className=" relative z-0 w-32 h-32 overflow-hidden self-center" onClick={()=>fileUploadRef.current.click()}>
            <img src={imageUrl || currentUser.avatar} alt=""  className=' rounded-full h-full w-full cursor-pointer object-cover' />
              <div className=" absolute top-[70%] left-24 z-10  rounded-full w-6 cursor-pointer bg-white border border-1 border-black" >
                <img src="../src/assets/add.png" alt="" className=' w-full  aspect-square object-cover ' />
              </div>
        </div>
          <div className="">
            <input type="text" className='  px-8 py-2 w-56 text-sm   rounded-xl'onChange={handelChange}  id="fullName" defaultValue={currentUser.fullName} />
          </div>
          <div className="">
            <input type="email" className='  px-8 py-2 w-56 text-sm  rounded-xl' onChange={handelChange} id="email" defaultValue={currentUser.email} />
          </div>
          <div className="">
            <input type="password" className='  px-8 py-2 w-56 text-sm  rounded-xl' onChange={handelChange} id="password" placeholder='*********'  />
          </div>
          <div className=" ">
            <button className={`bg-black text-white px-5 py-1 rounded-lg ${displayMsg ? 'disabled' : ''}`}>Update</button>
          </div>
       </div>
      </form>
      <div className=" ">
        {errorMsg ? (
          <div className=" mt-8 bg-red-200 w-96 h-8 rounded-md text-center">
            <p className=' text-red-600 text-sm pt-1'>{errorMsg}</p>
          </div>
        ):(
          <h1></h1>
        )}
      </div>

      <div className="flex justify-between mt-5">
        <div className=" ">
          <button className=' text-red-600 px-3 py-1 rounded-md hover:text-red-700' onClick={handelDelete}>Delete Account</button>
        </div>
        <div className="">
          <button className=' text-red-600 px-4 py-1 rounded-md hover:text-red-700' onClick={handelSignout}>Log Out</button>
        </div>
      </div>
    </div>
    </>
  )
}
