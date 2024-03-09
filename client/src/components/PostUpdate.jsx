import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { useDispatch,useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

export default function PostUpdate() {
    const {id}=useParams()
  const {currentUser}=useSelector((state)=>state.user)
  const navigate = useNavigate()
  const [loading,setLoading]=useState(false)
  const dispatch = useDispatch()
  const imageRef = useRef()
  const [image,setImage]=useState()
  const [imageUrl,setImageUrl]=useState()
  const [displayMsg,setDisplayMsg]=useState('')
  const [errorMsg,setErrorMsg]=useState('')
  const [formData,setFormData]=useState({
    name:'',
    discription:'',
    category:'',
    image:''
  })
  

  const handelImageChange=(e)=>{
    const file = e.target.files[0]
    if(file){
      setImage(file)
      setImageUrl(URL.createObjectURL(file))
      setFormData({...formData,[e.target.id]:e.target.files[0]})
    }
  }

  const handelChange=(e)=>{
    setFormData({...formData,[e.target.id]:e.target.value})
  }

  const config = {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  };

  const handelUpdateChange = async (e) => {
    e.preventDefault();

    if(Object.keys(formData).length === 0) {
      return setErrorMsg('Make some changes');
    }

    try {
      setLoading(true)
      setDisplayMsg('Updating...')
      setErrorMsg('')
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      };
      const res = await axios.put(`http://localhost:3000/api/v1/user/updateblog/${formData._id}`,formData,config)
      if (res.status === 200) {
        alert('Update success')
        setDisplayMsg('')
        navigate('/dashboard?tab=posts')
        setLoading(false)
      }
    } catch (error) {
      setLoading(false)
      console.error(error.message);
    }
  };

  const fetchData = async () => {
    try {
        const res = await axios.get(`http://localhost:3000/api/v1/user/getblog?id=${id}`);
      if (res.status === 200) {
        setFormData(res.data);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(()=>{
    fetchData()
    
  },[id])



  return (
    <>
    <div className=" flex h-screen w-5/6 justify-center items-center">
      <div className=" bg-slate-200 w-4/6 h-5/6 rounded-lg mt-10">
          <div className=" text-5xl font-bold font-serif text-center mt-5">Make Post</div>
          <div className=" mt-4">
            <form onSubmit={handelUpdateChange}>
                <div className=" flex justify-around">
                  <input className=' w-3/5 py-2 rounded-lg place-content-center' required  type="text"  onChange={handelChange}  id="name" placeholder='Name of the destination'  defaultValue={formData.name}/>

                    <div className=' rounded-lg  border-2-dashed border-black flex items-center justify-center w-1/5'>
                      <label htmlFor="category" className=' mr-2'>Category</label>
                      <select required id="category" value={formData.category} onChange={handelChange}>
                        <option value="">Select..</option>
                        <option value="Inside Valley">Inside Valley</option>
                        <option value="Outside Valley">Outsice Valley</option>
                      </select>
                  </div>
                </div>

                <div className=" flex mt-5 ml-10">
                  <textarea id="discription" name="myTextarea" rows="4" cols="50" defaultValue={formData.discription} required placeholder='Discription of the loacation' onChange={handelChange}/>
                </div>

                

                <div className="">
                  <input type="file" accept='image/*' id="image"  ref={imageRef} className=' hidden' onChange={handelImageChange}/>
                </div>

                <div className=" ml-10 mt-5" >
                  <div className="border-green-500 border-4 border-dotted w-40 h-40 rounded-lg cursor-pointer" onClick={()=>imageRef.current.click()}>
                    <div className=" ">
                      <img src={imageUrl || formData.image || './src/assets/add.png'} alt=""  />
                    </div>
                  </div>
                </div>
                
                <div className=" flex justify-center mt-20">
                   <button type='submit' className={` bg-black py-2 px-16 text-white text-xl  rounded-xl ${loading ? 'disabled':''}`} >
                      Update
                    </button>
                </div>
            </form>
          </div>
      </div>
    </div>
    </>
  )
}
