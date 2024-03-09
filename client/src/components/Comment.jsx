import axios from 'axios'
import React, { useEffect, useState } from 'react'
import moment from 'moment'
import {useSelector} from 'react-redux'

export default function Comment({comment,fetchComments}) {
    //fetchComments is the function in the commentsection which fetch the comments here it is passed as a props to refetch the data when  the user delete or edit the comments 
    const [user,setUser]=useState([])
    const {currentUser}=useSelector((state)=>state.user)
    const [isEditng,setIsEditng]=useState(false)
    const [newComment,setNewComment]=useState('')


    const fetchUser = async()=>{
        try {
            const res = await axios.get(`http://localhost:3000/api/v1/${comment.userId}`)
            if(res.status === 200){
                setUser(res.data)
            }
        } catch (error) {
            console.log('Error fetching user')
        }
    }
    useEffect(()=>{
        fetchUser()
    },[comment])

    const handelCommentDelete=async()=>{
        try {
            const res = await axios.delete(`http://localhost:3000/api/v1/deletecomment/${comment._id}`)
            if(res.status === 200){
                alert("Comment delete success")
                fetchUser()
                fetchComments()
            }
        } catch (error) {
            console.log(error.message)
        }
    }
    const handelEditBtn=()=>{
        setIsEditng(!isEditng)
    }


    const updateComment=async(e)=>{
        e.preventDefault()
        try {
            const newForm = {content: newComment}
            const res = await axios.put(`http://localhost:3000/api/v1/editcomment/${comment._id}`,newForm)
            if(res.status === 200){
                setIsEditng(false)
                fetchComments()
                setNewComment(' ')
                alert("Edit success")
            }
        } catch (error) {
            console.log(error.message)
        }
    }
    
  return (
    <>
    <div className=" flex gap-4 items-center ">
        <div className="">
            <img className=' w-10 h-10 object-cover rounded-full items-center' src={user.avatar} alt="" />
        </div>
        {isEditng ? (
            <div className="">
                <form onSubmit={updateComment}>
                    <div className=" my-5 mx-5 mt-0">
                        <textarea className=' bg-slate-100' id="" cols="50" rows="2"  placeholder='Write comment' maxLength={200} onChange={(e)=>setNewComment(e.target.value)} defaultValue={comment.content}/>
                    </div>
                    <div className=" flex gap-5 -mt-3 mx-5">
                        <div className="">
                            <button type='submit' className=' bg-blue-600 text-white py-1 px-5 rounded-lg'>Save</button>
                        </div>
                        <div className="">
                            <button className=' bg-blue-600 text-white py-1 px-5 rounded-lg' onClick={handelEditBtn}>Cancel</button>
                        </div>
                    </div>
                </form>
            </div>
        ):(
            <div className="">
                <div className=" flex items-center gap-1">
                    <p className='text-xs font-bold'>@{user.fullName}</p>
                    <p className='text-xs text-gray-600'>{moment(comment.updatedAt).fromNow()}</p>
                </div>
                <div className=" max-w-xl">
                    <p >{comment.content}</p>                     
                </div>

                <div className="">
                    {comment.userId === currentUser._id ? (
                        <div className=" flex gap-5">
                        <div className="">
                            <button className=' text-blue-500 text-sm' onClick={handelEditBtn}>Edit</button>
                        </div>
                        <div className="">
                            <button className=' text-red-500 text-sm' onClick={handelCommentDelete}>Delete</button>
                        </div>
                    </div>
                    ):(
                        <div className=""></div>
                    )}
                </div>
            </div>
        )}
    </div>
    
    </>
  )
}
