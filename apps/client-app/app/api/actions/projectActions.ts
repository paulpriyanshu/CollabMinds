"use server"
import db from "@repo/db/client"
export interface Project {
    title: string;
    userEmail: string;
    videoName?: string;
    thumbnnailUrl?: string;

}


export const AccessCode=async(title:string)=>{
    let accessCode=Math.floor(Math.random()*(999999-99999))+9999
    const code=accessCode.toString()
    console.log("this is access code",code)
    const save=await db.projects.update({
      where:{
        title:title
      },
      data:{
          accessCode:code
      }
    })
    return code

}
export const SendProject=async(email:string,code:string)=>{
  const send=db.projects.update({
    where:{
      accessCode:code
    },
    data:{
      editorEmail:email
    }
  })
  return send
}
export const CreateTitle = async(title:string,userEmail:string) =>{
   
    const save=await db.projects.create({
        data:{
            title:title,
            userEmail:userEmail,
        }

    })

    console.log("saved")
    return save
}
export const fetchProjects=async(email:string)=>{
    console.log("entered the function")
  if (email) {
   
      const response=await db.projects.findMany({
          where:{
              userEmail: email
          }
          
      })
    console.log(response)
    return response
  }

  }
  export const vidupdate=async(title:string,name:any)=>{
   

    const response=await db.projects.update({
    where:{
      title:title
    },
    data:{
      videoName:{
        push:name
      }
    }
  })
}

export const thumbnailupdate=async(title:string,thumbnails:string)=>{
  const response=await db.projects.update({
    where:{
      title:title
    },
    data:{
      thumbnailUrl:{
        push:thumbnails
      }
    }
  })

}
export const deleteprojects=async(title:string)=>{
  const response=await db.projects.delete({
    where:{
      title:title
    }
  })
}

export const editorPage=async(email:string)=>{

const userIsEditor= await db.editor.findUnique({
  where:{
      email:email
  }
})
if(!userIsEditor) return false
return true

}
export const editor=async(email:string)=>{
  const user=await db.editor.create({
    data:{
      email:email
    }
  })
  return user

}
export const editorcheck=async(email:string)=>{
  const user=await db.editor.findUnique({
    where:{
      email:email
    }

  })
  return user
}
