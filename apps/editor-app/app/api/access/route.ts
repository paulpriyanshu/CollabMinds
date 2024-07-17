"user server"

import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"

export async function GET (){
     const session=await getServerSession()
    const greet={
        msg:"hello"
    }
    return NextResponse.json({
        greet,
        session
    })

}