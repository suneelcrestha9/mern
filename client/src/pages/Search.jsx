import React from 'react'
import { Link, useLocation } from 'react-router-dom';

export default function Search() {
    const location = useLocation();
    const searchData = location.state?.searchData || [];
  return (
    <div>
        <div className=" mt-10">
            <h1 className=' text-6xl text-center font-medium font-serif'>Searched Item</h1>
        </div>
        <div className=" mx-32">
            {searchData.length >0 ?(
                <div className=" flex flex-wrap justify-around mt-10 rounded-lg">
                    {searchData.map((blog,index)=>(
                        <div className=" bg-gray-200 rounded-lg" key={index}>
                            <Link to={`/postview/${blog._id}`}>
                                <div className=" flex flex-col">
                                    <div className="">
                                        <img className=' w-60 h-80 object-cover rounded-md' src={blog.image} alt="" />
                                    </div>
                                    <div className="">
                                        <p className=' text-lg capitalize'>{blog.name}</p>
                                        <p className=' text-sm text-gray-400'>{blog.category}</p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            ):(
                <div className=" flex  mt-52 ml-96 ">
                    <div className="flex flex-col items-center">
                        <h1 className=' text-6xl font-bold text-center mx-16'>Sorry!!</h1>
                        <h1 className=' text-6xl font-bold text-center mx-16'>No such blog...</h1>
                    </div>
                </div>
            )}
        </div>
    </div>
  )
}
