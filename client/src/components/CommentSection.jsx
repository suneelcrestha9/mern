import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Comment from './Comment'
import {Link} from 'react-router-dom'

export default function CommentSection({blogId}) {
    const {currentUser}=useSelector((state)=>state.user)
    const [comment,setComment]=useState('')
    const [commentFetched,setCommentFetched]=useState([])
 
   

    //fetching comments
    const fetchComments=async()=>{
        try {
            const res = await axios.get(`http://localhost:3000/api/v1/create/getcomment/${blogId}`)
            if(res.status === 200){
                setCommentFetched(res.data)
            }
        } catch (error) {
            console.log(error.message)
        }
    }

    useEffect(()=>{
        fetchComments()
    },[blogId])

     //handeling submit and sending comments
     const handelComment= async(e)=>{
        e.preventDefault()
       if(currentUser){
        try {
            const formComment = {content:comment,blogId,userId:currentUser._id}
            const res= await axios.post(`http://localhost:3000/api/v1/create/postcomment`,formComment)
            if(res.status === 200){
                alert("Commented successfully")
                setComment(' ')
                fetchComments()
            }
        } catch (error) {
            console.log(error.message)
        }
       }else{
        return alert("You need to login to comment")
       }
    }
  return (
    <>
    <div className="">
        <div className=" ">
            {currentUser ? (
                <div className="flex gap-1 items-center text-gray-500 ml-5">
                    <p>Signed as:</p>
                    <img className=' h-5 w-5 object-cover rounded-full' src={currentUser.avatar} alt="" />
                    <p className=' text-blue-500'>{currentUser.email}</p>
                </div>
            ):(
                <div className="">
                    <Link to='/login'><p className=' text-blue-600 font-semibold cursor-pointer'>Login</p></Link>
                </div>
            )}
        </div>
        <div className="">
        <form onSubmit={handelComment}>
            <div className=" mx-5 border-2 border-black rounded-lg flex gap-1 max-w-xl">
                <div className=" my-5 mx-5">
                    <textarea className=' bg-slate-100' id="" cols="40" rows="3"  placeholder='Write comment' maxLength={200} onChange={(e)=>setComment(e.target.value)} value={comment}/>
                </div>
                <div className=" mx-5 flex flex-col gap-4 ">
                    <div className="">
                        <p className=' text-gray-500 text-sm mt-3'>{200 - comment.length} character remaining</p>
                    </div>
                    <div className="">
                        <button type='submit' className=' bg-black text-white py-1 px-3 rounded-lg'>Submit</button>
                    </div>
                </div>
            </div>
        </form>
        <div className=" mx-5 flex flex-col gap-2 ">
            <div className=" flex mt-5  items-center gap-1">
                Comments:<p className=' bg-blue-500 text-white h-5 w-5 rounded-lg text-center text-sm'>{commentFetched.length}</p>
            </div>
            {commentFetched.length > 0 ? (
                <div className=" flex flex-col gap-8 mx-5 ">
                    {commentFetched && commentFetched.map((comment,index)=>(
                        <div className=" flex  gap-10 items-center shadow-sm" key={index}>
                            <div className="">

                                {/* using comment componet whrere the user image id and blogid will be sent using props comment */}
                                <Comment comment={comment} fetchComments={fetchComments}/>
                            </div>
                        </div>
                    ))}
                </div>
            ):(
                <div className=" mx-5">
                    <p className=' text-sm text-gray-500'>No comments yet!</p>
                </div>
            )}
        </div>
        </div>
    </div>
    </>
  )
}
