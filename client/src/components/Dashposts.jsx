import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

export default function Dashposts() {
  const {id}=useParams()
  const navigate = useNavigate()
  const { currentUser } = useSelector((state) => state.user);
  const [blogs, setBlogs] = useState([]);
  const [dataChanged,setDataChanged]=useState(false)

  const fetchData = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/api/v1/user/getblog/${currentUser._id}`);
      if (res.status === 200) {
        setBlogs(res.data);
        console.log(blogs);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handelDelete = async (_id) => {
    try {
      const response = await axios.delete(`http://localhost:3000/api/v1/blog/delete/${_id}`);
        if(response.status === 200){
          console.log("Blog deleted success")
          alert('Blog deleted')
          fetchData()
        }
      
    } catch (error) {
      console.error('Error deleting user:', error.message);
     
    }
  };



  const handelUpdate=(_id)=>{
    navigate(`/update/${_id}`)
  }
  

  return (
    <>
      <div className="">All the posts</div>
      <div className="flex flex-col mt-16 gap-8">
        {currentUser &&
          blogs.map((blog, index) => (
            <div className="flex gap-4" key={index}>
              <div className="">{blog.name}</div>
              <div className="">
                <img src={blog.image} alt="" className="w-10 h-auto" />
              </div>
              <div className="truncate w-16">{blog.description}</div>
              <div className="">{blog.updatedAt}</div>
              <div className="">{blog.category}</div>
             
              <div className="">
                <button className="bg-black text-white py-1 px-4 rounded-lg" onClick={()=>handelDelete(blog._id)}>
                  Delete
                </button>
              </div>
              <div className="">
                <button className="bg-black text-white py-1 px-4 rounded-lg"  onClick={()=>handelUpdate(blog._id)}>Update</button>
              </div>
            </div>
          ))}
      </div>
    </>
  );
}
