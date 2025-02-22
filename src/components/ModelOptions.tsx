import { contents, models } from '@/data/website'
import Image from 'next/image'
import React from 'react'

function ModelOptions() {
  return (
    <div className='w-full h-full flex flex-col items-center justify-start md:px-20 md:py-10 md:gap-20'>
        <div className='flex flex-col justify-start items-center w-full md:gap-20'>
          <h2 className='custom-heading font-bold text-foreground'>
            {contents.text3}
          </h2>
          <div className='flex flex-wrap md:gap-10 justify-center items-start w-full'>
            {models.map((model, index) => (
              <div key={index} className='flex flex-col items-center justify-center gap-4 rounded-[40px] bg-primary p-4 md:w-[360px] md:h-[360px]'>
                <Image width={300} height={300} src={'/videos/GIF-12.gif'} alt={model.name} className='object-cover'/>
                {/* <h3 className='text-2xl font-bold text-primary font-lily'>{model.name}</h3>
                <p className='text-lg font-medium text-primary'>{model.name}</p> */}
              </div>
            ))}
          </div>
        </div>
    </div>
  )
}

export default ModelOptions