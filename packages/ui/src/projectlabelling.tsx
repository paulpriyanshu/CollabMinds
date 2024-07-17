"use client"
import React from 'react'
import Modal from './modal'
import Button from './button'
import { useState } from 'react';
import ProjectComponent from './projectcomponent';
import db from '@repo/db/client'
import { useSession } from 'next-auth/react';
import {CreateTitle} from "../../../apps/client-app/app/api/actions/projectActions"
import {useAppSelector,useAppDispatch} from "../../../apps/client-app/app/lib/Projectshooks"
import { RootState,AppDispatch } from '../../../apps/client-app/app/lib/ProjectsStore';
import { createproject } from '../../../apps/client-app/app/lib/features/ProjectSlice';
import { Project } from '../../../apps/client-app/app/api/actions/projectActions';
function ProjectLabel() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSecondModalOpen, setIsSecondModalOpen] = useState(false)
    const [title,settitle]=useState("")
    const [showProject,setShowProject] = useState(false)
    const dispatch=useAppDispatch<AppDispatch>()
    //const [userEmail,setUserEmail] = useState("")
    const session=useSession()
    
    const HandleShowComponent=async()=>{
        console.log(session)
        const userEmail=session?.data?.user?.email||""
        console.log(title)
        console.log(userEmail)

        const response=await CreateTitle(title,userEmail)

        dispatch(createproject({title,userEmail}))
        console.log("dispatched to store")

        console.log("response",response)
        setShowProject(true)
        setIsModalOpen(false)
        setIsSecondModalOpen(true)
        console.log("this is modal",isSecondModalOpen)
        console.log("this is project",showProject)

    }
    const handleNewProject=()=>{
        setIsModalOpen(true)
        setIsSecondModalOpen(false)
        
    }

  return (
    <div>
        <div>
            <Button onClick={handleNewProject}>
                New Project
            </Button>
        </div>
        <Modal isOpen={isModalOpen}>
        <div className='flex flex-cols'>
          <div>
            <div className='flex justify-end m-2'>
              <button onClick={() => setIsModalOpen(false)} className="bg-transparent border-none text-4xl text-white hover:font-extrabold">
                &times;
              </button>
            </div>
            <div>
            <div className="flex h-1/3 w-full flex-col items-center rounded-3xl justify-between border-4 border-slate-800 shadow-2xl p-16 bg-black">
           <div>
            <h1 className='text-white text-4xl mb-20 font-mono font-extrabold'> 
                Create New Project
            </h1>
           </div>
           <div className="flex justify-start w-full mb-5">
           <h1 className='text-white text-2xl font-mono font-semibold'>Title</h1>
           </div>
            <input onChange={(e)=>settitle(e.target.value)} type="text" placeholder='Name your Project' className="p-2 px-4 rounded-2xl bg-slate-800 mb-5 w-full text-2xl font-mono text-white"/>
            <button onClick={HandleShowComponent} className='p-2 w-full m-3 mt-10 hover:bg-slate-300 bg-white w-2/3 rounded-2xl text-2xl font-semibold'>NEXT</button>
              
            </div>

            </div>
            
          </div>
        </div>
      </Modal>
      {isSecondModalOpen && <ProjectComponent isOpen={isSecondModalOpen} title={title} />}
    </div>
  )
}

export default ProjectLabel