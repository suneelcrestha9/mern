import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


export default function Add() {
  const navigate = useNavigate()
  const [name, setName] = useState('');
  const [imageUrl,setImageUrl]=useState('')
  const [image, setImage] = useState(null);
  const [imageUploadStart,setImageUploadStart]=useState(false)

  const handelImage=(e)=>{
    const file = e.target.files[0]
    setImage(file)
    setImageUrl(URL.createObjectURL(file))
  }


  const handelSubmit= async (e)=>{
    e.preventDefault();

    const formData = new FormData()
    formData.append("name",name)
    formData.append("image",image)

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    };

    try {
      setImageUploadStart(true)
      const res = await axios.post('http://localhost:3000/api/v1/post-user',formData,config)
      if(res.status === 200){
        console.log(res.data)
        navigate('/')
        setImageUploadStart(false)
      }
    } catch (error) {
      setImageUploadStart(false)
      console.error(error.message)
    }

  }


  return (
    <div className='flex justify-center items-center bg-slate-300'>
      <div className="">
        {imageUploadStart ? (
          <div className=" absolute top-0 bg-blue-500 text-white w-80 h-8 rounded-md text-center">
            <p className=' text-white text-sm pt-1'>Image upload start..</p>
          </div>
        ):(
          <h1></h1>
        )}
      </div>
      <div className=''>
        <div className=''>
          <h2 className='text-2xl text-blue-500'>Create a New Post</h2>
        </div>
        <form onSubmit={handelSubmit} className='flex flex-col gap-4'>
          <div>
            <input
              type='text'
              id='name'
              onChange={(e) => setName(e.target.value)}
              placeholder='Your title'
            />
          </div>
          <div>
            {/* Add a file input for the image */}
            <input type='file' id='image' accept='image/*' onChange={handelImage} />

            {/* Display a preview of the selected image */}
            {imageUrl && <img src={imageUrl} alt="" className=' h-24 w-auto' />}
          </div>
          <button type='submit' className='bg-black text-white w-20'>
              {imageUploadStart ? 'Uploading...' : 'Post'}
          </button>
        </form>
      </div>
    </div>
  );
}
