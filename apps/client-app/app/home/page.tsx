"use client"
import React from 'react'
import { useSession } from 'next-auth/react'
export default function () {
  const session = useSession()
  return (
    <>
    
    <div>Welcome to home page</div>
    
    </>
    
  )
}

