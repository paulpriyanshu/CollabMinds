"use client"
import Dashboard from '@repo/ui/dashboard'
import React, { useEffect } from 'react'
import Button from '@repo/ui/button'
import ProjectComponent from '@repo/ui/projectcomponent'
import ProjectLabel from '@repo/ui/projectlabelling'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../lib/ProjectsStore'
import { fetchProjects } from '../api/actions/projectActions'
import {useState} from 'react'
import db from "@repo/db/client"
import { useSession } from 'next-auth/react'
import ProjectBar from "@repo/ui/projectBar"
import { setProject } from '../lib/features/ProjectSlice'
import { title } from 'process'


interface Project {
  id:number;
  userEmail:String;
  title:String;
}
function page() {
  // const dispatch=useDispatch()
  // const projects=useDispatch((state:RootState)=>state.projects.projects)
 
  // useEffect(()=>{
  //   dispatch(fetchProjects())
  // },[dispatch])
  const dispatch=useDispatch()
  const [projects,setProjects]=useState<Project[]>([])
  const {data:session,status}=useSession()
 
  const projdata=useSelector((state:RootState)=>state.projects.projects)
  const handlefetch=async()=>{
    console.log("this is session",session)
    if (session) {
      const email=session?.user.email
      console.log("this is user email",email)
      const response=await fetchProjects(email||"") ?? []
  
      console.log(response)
      // console.log("array of data",response)
      const projectsWithSerializedDates = response.map(project => ({
        ...project,
        createdAt: new Date(project.createdAt).toISOString(),
      }));
      console.log(projectsWithSerializedDates);
      await dispatch(setProject(projectsWithSerializedDates));
      setProjects(projectsWithSerializedDates);
      console.log("this is projdata",projdata)
    }
  }
 
  useEffect(()=>{
    if (status === 'authenticated') {
      handlefetch();
    }

  },[status])
  console.log("outside of useEffect")
  return (
    <>
      <Dashboard/>
      
      <div className='flex justify-end m-5 mr-10'>
        
      <ProjectLabel/>
      </div>
      <div className='flex justify-center'>
      <h1 className='text-white text-4xl font-extrabold'>Projects</h1>

      </div>
      
  
     {projdata.map((project:any)=>(<div key={project.id}>
      <div>
      <ProjectBar title={project.title}/>

      </div>
      

     </div>
     )
    )}
     
      
    </>
  )
}

export default page