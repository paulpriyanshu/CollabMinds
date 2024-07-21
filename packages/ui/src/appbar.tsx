"use client"
import Button from "./button"
import { useState } from "react"
import Slider from "./slider"
import Sliderbutton from "./sliderbutton"
import { signIn, useSession } from "next-auth/react"
import Userpic from "./userpic"



export interface AppbarProps {
    user?: {
        name?: string | null;
    },
    onSignin: any,
    onSignout: any
}

export const Appbar = ({
    user,
    onSignin,
    onSignout
}: AppbarProps) => {
    const session=useSession()
    return (
        <div className="bg-black text-white border-b-2 border-slate-800">

        <div className="flex justify-between px-4 py-4 bg-black">
   
        <div className="flex text-3xl font-extrabold font-sans ">
            <div>
            <Sliderbutton/>
            </div>
            <div className="mt-6 lg:mt-9">
                <img src="/logo.png" alt="Company Logo" className="h-10 w-13 rounded-2xl  lg:w-30 h-9 ml-2 rounded-2xl" />

            </div>

        </div>
        <div className="flex items-center lg:space-x-12 lg:text-xl md:space-x-6 space-x-2 text-sm font-extrabold mt-5 lg:mr-20 sm:ml-20">
          <a href="/home" className="hover:text-gray-400 hidden md:block ">Home</a>
          <a href="/channel" className="hover:text-gray-400 ">Channel</a>
          <a href="/dashboard" className="hover:text-gray-400 ">Dashboard</a>
          <a href="/projects" className="hover:text-gray-400 hidden sm:block">Projects</a>
          <a href="/community" className="hover:text-gray-400 hidden md:block ">Community</a>
        </div>
    
        <Userpic onSignin={onSignin} onSignout={onSignout}/>
    </div>
   
    </div>
    )
}