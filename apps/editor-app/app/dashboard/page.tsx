"use client"
import React, { useEffect, useState } from 'react'
import EditorDashboard from '../../../../packages/ui/src/Editordashboard'
import { fetchclientname, fetchProjectsOfEditor } from '../api/actions/editorActions'
import { useSession } from 'next-auth/react'
import ProjectBar from "@repo/ui/projectBar"
import { useRouter } from 'next/navigation'
import EditorProjectBar from "@repo/ui/editorprojectbar"

interface Project {
  id: number;
  userEmail: string;
  editorEmail: string | null;
  title: string;
  videoName: string[];
  thumbnailUrl: string[];
  accessCode: string | null;
  createdAt: Date;
  updatedAt: Date | null;
}

function Page() {
  const router = useRouter()
  const [projects, setProjects] = useState<Project[]>([])
  const { data: session, status } = useSession()
  const [email, setEmail] = useState("")

  useEffect(() => {
    if (status === "loading") {
      // Do nothing while loading
      return
    }
    if (!session) {
      router.push('/signup')
    } else {
      setEmail(session?.user?.email || "")
    }
  }, [session, status, router])

  const getProjects = async (email: string) => {
    if (email) {
      const data = await fetchProjectsOfEditor(email)
      console.log("these are data",data)
      setProjects(data)
      localStorage.setItem('data',JSON.stringify(data))

    }
  }

  useEffect(() => {
    if (email) {
      getProjects(email)
    }
  }, [email])

  return (
    <div>
      <EditorDashboard />
      <div className='flex justify-center w-full'>
        <div className='flex flex-col w-2/3'>
        <h1 className='flex justify-center text-4xl text-white font-bold m-5'>
        Projects
      </h1>
      <div>
        {projects.map((data) => (
          <div key={data.id} className='flex flex-col'>
            {/* <div className='w-1/2 border-2 border-slate-800'>
            {data.title}
            </div> */}
            <EditorProjectBar title={data.title} useremail={data.userEmail}/>
          </div>
        ))}
        </div>

          
        </div>
      
      </div>
      
      {/* <ProjectBar title={}/> */}
    </div>
  )
}

export default Page
