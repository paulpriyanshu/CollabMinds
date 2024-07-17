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
  const session=useSession()
  const projdata=useSelector((state:RootState)=>state.projects.projects)
  const handlefetch=async()=>{
    const response=await fetchProjects() ?? []


    // console.log("array of data",response)
    await dispatch(setProject(response))

    setProjects(response)
    //  response?.map(projects=>projdata.push(projects))
    console.log("this is projdata",projdata)
  }
 
  useEffect(()=>{
     handlefetch()
  },[])
  console.log("proj data 2",projdata)
  projdata.map((projects)=>console.log(projects.id))
  return (
    <>
      <Dashboard/>
      
      <div className='flex justify-end m-5 mr-10'>
        
      <ProjectLabel/>
      </div>
      <div className='flex justify-center'>
      <h1 className='text-white text-4xl font-extrabold'>Projects</h1>

      </div>
      
    {/* <div>
    {projects.map((project:any)=>(
        <div key={project.id}>
          <div className='text-white'>
            <ProjectBar title={title}/>
            hello
          </div>
        </div>
      ))}
    </div> */}
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