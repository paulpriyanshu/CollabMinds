'use server'
import { RegisterFormat } from "@repo/types";
import db from "@repo/db/client"
import { NextResponse } from "next/server";


export async function Register({name,email,number,password}:RegisterFormat) {
    const isUserExist=await db.user.findUnique({
      where:{
        email:email
      }
    })
 if (!isUserExist) {
     const user=await db.user.create({
       data:{ 
         email:email, 
         name:name,
         number:number,
         password:password
       }
     })
     return {
      message:"user registered successfully",
      data: user
    }
 }
    

    
    

    
}