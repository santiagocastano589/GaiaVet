import React from 'react'
import pastorcolli from '../../assets/pastorcolli.jpeg'
import { InfoDescription } from '../InfoDescription/InfoDescription'
import { InfoPhoto } from '../InfoPhoto/InfoPhoto'


export const InfoContainer = () => {
  return (
    <div className='w-full h-full p-10 flex justify-evenly items-center'>

        <div className='w-2/5'>
            <InfoPhoto image={pastorcolli} alt={'pastor colli'}/>            
        </div>
        <div className='w-2/5 h-full bg-slate-500' >

            <InfoDescription title={'Urgencias veterinarias 24 horas'} description={'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Soluta deserunt eum accusamus? Quod vitae ad sunt, eveniet nostrum perspiciatis rerum, iure blanditiis error officia sapiente? Nesciunt molestiae velit autem neque.Lorem ipsum dolor sit, amet consectetur adipisicing elit. Soluta deserunt eum accusamus? Quod vitae ad sunt, eveniet nostrum perspiciatis rerum, iure blanditiis error officia sapiente? Nesciunt molestiae velit autem neque.Lorem ipsum dolor sit, amet consectetur adipisicing elit. Soluta deserunt eum accusamus? Quod vitae ad sunt, eveniet nostrum perspiciatis rerum, iure blanditiis error officia sapiente? Nesciunt molestiae velit autem neque.Lorem ipsum dolor sit, amet consectetur adipisicing elit. Soluta deserunt eum accusamus? Quod vitae ad sunt, eveniet nostrum perspiciatis rerum, iure blanditiis error officia sapiente? Nesciunt molestiae velit autem neque.'} 
            />
        </div>
    </div>
  )
}
