import { NextResponse } from "next/server"
import  db  from "@repo/db/client"



export const GET = async () => {
    await db.user.create({
        data: {
            email: "asd",
            name: "adsads",
            password: "asd"
        }
    })
    return NextResponse.json({
        message: "hi there"
    })
}