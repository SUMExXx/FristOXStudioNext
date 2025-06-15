import { contents } from '@/lib/data/website'
import Image from 'next/image'
import React from 'react'

function Testimonials() {
  return (
    <div className='flex flex-col justify-start items-center w-full md:gap-10 md:py-10'>
      <h2 className='custom-heading font-bold text-foreground font-lily'>
        {contents.text11}
      </h2>
      <div className='flex flex-wrap md:gap-10 justify-center items-start w-full'>
        {Array.from([0,0,0,0,0,0,0,0]).map((model, index) => (
          <div key={index} className='flex flex-col items-center justify-center gap-4 rounded-[40px] bg-primary p-4 md:w-[360px] md:h-[360px]'>
            <Image width={300} height={300} src={'/videos/GIF-12.gif'} alt={"name"} className='object-cover'/>
            {/* <h3 className='text-2xl font-bold text-primary font-lily'>{model.name}</h3>
            <p className='text-lg font-medium text-primary'>{model.name}</p> */}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Testimonials