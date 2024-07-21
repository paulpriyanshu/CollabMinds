"use server"
import db from "@repo/db/client"
import { getServerSession } from "next-auth"
import { Finlandica } from "next/font/google"
import { resourceUsage } from "process"

export const fetchProjectsOfEditor=async(email:string)=>{
  // const session= await getServerSession()
    // const email=session?.user?.email

   
     const projects=await db.projects.findMany({
       where:{
         editorEmail:email
       }
     })
    

     // console.log(projects)
     return projects
}
export const fetchprojectdata=async(title:string)=>{
  const data=await db.projects.findUnique({
    where:{
      title:title
    }
  })
  return data;
}
export const fetchclientname=async(email:string)=>{
  console.log("this is email",email)
  const data=await db.user.findUnique({
    where:{
      email:email
    }
  })
  console.log(data?.name)
  return data
}




