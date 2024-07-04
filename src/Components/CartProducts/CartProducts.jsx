import React from 'react'

export const CartProducts = ({title, description, price, image}) => {
  return (
    <div className='w-2/5 bg-white flex justify-evenly rounded-xl items-center px-4 my-4 shadow-2xl'>
        <div className='w-2/5'>
            <img src={image} alt=''/>
        </div>
        <div className='w-1/2 flex flex-col p-4'>
            <div>
                <h4 className='text-center text-2xl py-4'>{title}</h4>
            </div>
            <div className='w-full'>
                <p className='text-sm pb-8 pt-2 text-center'>{description}</p>
            </div>
            <div className='w-full flex justify-evenly items-center'>
                <div>
                    <p className='text-lg'>${price}</p>
                </div>
                <div>
                    <button className='text-white w-full px-8 py-2 rounded-full bg-teal-500 shadow-md hover:bg-teal-400'>Comprar</button>
                </div>
            </div>
        </div>
    </div>
  )
}
