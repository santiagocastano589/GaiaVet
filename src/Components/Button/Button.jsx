import React from 'react'

export const Button = ({textButton}) => {
  return (
    <>
        <button className=' hover:bg-teal-300 shadow-lg shadow-gray-500/50 p-3 w-72 my-4 rounded-lg bg-blue-border '>{textButton}</button>
    </>
  )
}
