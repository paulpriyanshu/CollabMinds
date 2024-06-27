'use client'
import React, { useState } from 'react';
// import axios from 'axios';
import {SignupFormat,RegisterFormat} from "@repo/types"
import db from "@repo/db/client"
import {Register} from "@repo/actions/register"
import { signIn } from 'next-auth/react';
import {useRouter} from "next/navigation"


const Signup: React.FC<SignupFormat> = ({ name,email,number, password, confirmPassword }:SignupFormat) => {
  const router = useRouter()
  const [formData, setFormData] = useState({ name,email, password,number,confirmPassword});

  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
       if(password!=confirmPassword) {
        console.error('passwords do not match')

        return 
      }

      const user = await Register({
        name: formData.name,
        email: formData.email,
        number: formData.number,
        password: formData.password,
      });
      if(user){
        const result = await signIn('credentials',{
          redirect:false,
          name: formData.name,
          email: formData.email,
          password:  formData.password,
        })

        if (result && !result.error) {
          console.log('Signed in successfully');
          // Manually redirect the user to the desired page
          router.push('/dashboard'); // Change this to the desired path
        } else {
          console.error('Sign in failed:', result?.error);
        }
      }
     // Retu
    // return user
  }catch(error) {
    console.error('Error registering user:', error);
    
  }
  }
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Name:
          <input
          className='border-4 border-black-400'
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>
      </div>
      <div>
        <label>
          Email:
          <input
           className='border-4 border-black-400'
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>
      </div><div>
        <label>
          Phone Number:
          <input
           className='border-4 border-black-400'
            type="text"
            name="number"
            value={formData.number}
            onChange={handleChange}
            required
          />
        </label>
      </div><div>
        <label>
          Password:
          <input
           className='border-4 border-black-400'
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </label>
      </div>

      <div>
        <label>
          Confirm Password:
          <input
           className='border-4 border-black-400'
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </label>
      </div>
      <button type="submit">Sign Up</button>
    </form>
  );
};


export default Signup;



