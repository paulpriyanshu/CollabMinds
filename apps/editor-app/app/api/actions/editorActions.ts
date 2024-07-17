"use server"
import db from "@repo/db/client"
import { getServerSession } from "next-auth"

export const fetchProjectsOfEditor=async()=>{
  const session= await getServerSession()
    const email=session?.user?.email

    const projects=await db.projects.findMany({
      where:{
        editorEmail:email
      }
    })
    console.log(projects)
    return projects
  }