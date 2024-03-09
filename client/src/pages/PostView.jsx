import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CommentSection from '../components/CommentSection';

export default function PostView() {
    const { id } = useParams();
    const [blogs, setBlogs] = useState([]);

    const fetchData = async () => {
        try {
            const res = await axios.get(`http://localhost:3000/api/v1/user/getblog?id=${id}`);
          if (res.status === 200) {
            setBlogs(res.data);
          }
        } catch (error) {
          console.error(error.message);
        }
      };

    useEffect(() => {
        fetchData();
    },[id]);

    return (
        <div>
           <div className=" flex flex-col gap-2 items-center">
                <div className="">
                    <h1 className=' text-5xl font-bold'>{blogs.name}</h1>
                </div>
                <div className="">
                    <p className=' text-sm py-1 text-center rounded-lg bg-slate-400 w-28 '>{blogs.category}</p>
                </div>
                <div className=" mt-10">
                    <img className=' w-56 h-72 object-cover ' src={blogs.image} alt="" />
                </div>
                <div className="">
                    <p className=' text-xl text-wrap mx-5'>{blogs.discription}</p>
                </div>
                <div className=" mt-10">
                  <CommentSection blogId={blogs._id}/>
                </div>
           </div>
        </div>
    );
}
