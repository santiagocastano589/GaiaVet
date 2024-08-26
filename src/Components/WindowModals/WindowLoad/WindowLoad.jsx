import { RotateSpinner } from "react-spinners-kit";
import React from 'react'

export const WindowLoad = () => {
  return (
    <>
        <div className='w-screen h-screen bg-white bg-opacity-50 fixed z-50 inset-0 flex items-center justify-center'>
            <div>
            <RotateSpinner size={70} color="#1E6C64" />

            </div>
        </div>
    </>
    
  )
  
}
