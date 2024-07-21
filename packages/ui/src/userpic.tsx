import React, { useEffect } from 'react'
import { useSession } from 'next-auth/react'
import Button from './button'

export interface AppbarProps {
    
    onSignin: any,
    onSignout: any
}
function Userpic({
    
    onSignin,
    onSignout
}:AppbarProps) {
    const session=useSession()
    const user=session.data?.user
  useEffect(()=>{
    console.log(session)
  },[session])
  return (
    <>
  <div className="flex  justify-center pt-2  mr-5 lg:mr-10 mt-3">
            <div className="w-10 h-10 mt-2 mr-3">
                <img src={session.data?.user?.image ?? ""} alt="user" className="rounded-full "/>
            </div>

            <Button  onClick={user ? onSignout : onSignin}>{user ? "Logout" : "Login"}</Button>
        </div>
    </>
  )
}

export default Userpic