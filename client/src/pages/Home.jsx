import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';


const Home = () => {
  const trunkentedText = (text, maxWords)=>{
    if(!text) return '';
    const words = text.split(' ')
    if(words <= maxWords) return text;
    const truncated = words.splice(0,maxWords).join(' ')+ '...'
    return truncated
  }

  const [data, setData] = useState([]);

  const getData = async () => {
    try {
      const res = await axios.get('http://localhost:3000/api/v1/user/getblog');
      if (res.status === 200) {
        setData(res.data);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    getData();
  },[]);

  return (
    <>
      <div className="">
        This is blogging site
      </div>
      <div className="flex justify-start flex-wrap gap-20 mx-20">
        {data.map((blog, index) => (
          <div className=" " key={index}>
            <Link to={`/postview/${blog._id}`}>
              <div className=" cursor-pointer ">
                <div className="">
                  <img src={blog.image} alt="" className="w-60 h-80 object-cover rounded-md" />
                </div>
                <div className=" bg-slate-200 rounded-lg items-center w-60 h-40">
                  <div className="text-2xl font-semibold text-center">
                    {blog.name}
                  </div>
                  <div className=" text-center">
                    {trunkentedText(blog.discription,20)}
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
};

export default Home;
