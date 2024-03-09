import React from 'react';
import { app } from '../firebase';
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import {signInStart ,singInSuccess ,singInFailure } from '../redux/userSlice'



export default function Oauth() {
  const dispatch =useDispatch()
  const navigate = useNavigate()
  const auth = getAuth(app);

  const handleGoogleClick = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });

    try {
      dispatch(signInStart())
      const resultFromGoogle = await signInWithPopup(auth, provider);
      const {email , displayName , photoURL}=resultFromGoogle.user;

      const userData = {
        email,
        fullName: displayName,
        avatar: photoURL
      }
      const res = await axios.post('http://localhost:3000/api/v1/user/google',userData)
      if(res.status === 200){
        dispatch(singInSuccess(res.data))
        navigate('/')
      }
    } catch (error) {
      dispatch(singInFailure(error.message))
      console.log(error.message)
    }
  };

  return (
    <>
      <button
        className='bg-orange-300 px-6 py-1 rounded-md hover:bg-orange-800 hover:text-white'
        onClick={handleGoogleClick}
      >
        Login with Google
      </button>
    </>
  );
}
