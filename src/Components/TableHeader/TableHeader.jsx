import React from 'react'

export const TableHeader = ({title}) => {
  return (
    <>
        <th className='w-[18rem] border p-2 mx-4 bg-teal-500 rounded-lg'>{title}</th>
    </>
  )
}
