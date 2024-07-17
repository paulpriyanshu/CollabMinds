import React from 'react'

function RoleCard({children,onClick}) {
  return (
    <div className="h-1/2 w-1/3 m-5 rounded-2xl bg-white bg-opacity-20 backdrop-blur-lg transform transition-transform duration-300 hover:scale-105" onClick={onClick}>

            <div className='flex justify-center items-center h-full text-4xl text-white font-extrabold'>
            {children}
            </div>
            
    </div>
  )
}

export default RoleCard