import { contents } from '@/data/website'
import React from 'react'

function UseCases() {
  return (
    <div className='w-full flex flex-col items-center justify-start md:py-10 md:gap-20'>
      <div className='w-full flex flex-col items-center justify-start md:py-10 md:px-32 md:gap-10 bg-primary'>
        <h2 className='custom-heading text-foreground2 text-center'>
          {contents.text1}
        </h2>
        <div className='flex flex-warp justify-between items-start md:px-10 w-full'>
            {contents.usecases.map((use, index) => (
              <div key={index} className='flex flex-col items-start justify-center md:gap-[10px] md:w-[240px]'>
                <h4 className='custom-display1 w-full text-background text-left'>{use.name}</h4>
                <h6 className='custom-text2 w-full text-background text-left'>{use.text}</h6>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}

export default UseCases;