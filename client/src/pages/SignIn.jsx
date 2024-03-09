import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Oauth from '../components/Oauth';

export default function SignIn() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3000/api/v1/user/singup', formData);
      if (res.status === 200) {
        console.log("Sign up success");
        // Navigate after successful sign up
        navigate('/login');
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <div className="flex justify-center">
        <div className="min-h-96 w-80 mt-52 bg-slate-300 flex flex-col gap-4 items-center rounded-lg">
          <h2 className="text-2xl mt-2 font-bold">Sign In</h2>

          <form className="m-8 mb-0" onSubmit={handleSubmit}>
            <div className="mb-4">
              <input
                className="bg-gray-100 p-2 rounded-md"
                type="text"
                placeholder="Full name"
                id="fullName"
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <input
                className="bg-gray-100 p-2 rounded-md"
                type="email"
                placeholder="Email"
                id="email"
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <input
                className="bg-gray-100 p-2 rounded-md"
                type="password"
                placeholder="Password"
                id="password"
                onChange={handleChange}
              />
            </div>
            <div className="w-full flex justify-center">
              <button className="m-4 mb-0 bg-black text-white py-2 px-8 rounded-md text-center"type="submit">Submit</button>
            </div>
          </form>
          <Oauth/>
          <div className=" mb-9">
            <h2>Already have an account?</h2>
            <div className="flex justify-center">
                <Link to='/login' className=' text-blue-700  '>Login</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
