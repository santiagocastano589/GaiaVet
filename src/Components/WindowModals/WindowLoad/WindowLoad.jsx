import React from 'react'
import { Spinner } from "flowbite-react";

export const WindowLoad = () => {
  return (
    <>
        <div className='w-screen h-screen bg-black bg-opacity-50 fixed z-50 inset-0 flex items-center justify-center'>
            <div>
                <Spinner aria-label="Extra large spinner example" size="xl" />
            </div>
        </div>
    </>
    
  )
  
}
