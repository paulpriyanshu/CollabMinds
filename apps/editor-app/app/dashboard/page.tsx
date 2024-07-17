"use client"
import React, { useEffect, useState } from 'react'
import EditorDashboard from '../../../../packages/ui/src/Editordashboard'
// import { fetchProjects, fetchProjectsOfEditor } from '../../../client-app/app/api/actions/projectActions'
import { fetchProjectsOfEditor } from '../api/actions/editorActions'
import { useSession } from 'next-auth/react'
 function page() {
  const [projects,setProjects]=useState([])
  const {data:session}= useSession()
  console.log("this is first session",session)
   const email=session?.user?.email ||""
   console.log("this is first email",email)
  
  const getProjects=async()=>{
    console.log(email)
    const data=await fetchProjectsOfEditor()
    console.log(data)
  }
  useEffect(()=>{
    getProjects()
  },[])
  return (
    <div>
      <h1 className='text-4xl text-white font-bold'>
        Projects
        
      </h1>

    </div>  
  )
}

export default page

