import { contents } from '@/lib/data/website'
import React from 'react'

function Features() {
  return (
    <div className='w-full flex flex-col items-center justify-start md:px-20 md:py-10 md:gap-10'>
        <h2 className='custom-heading text-foreground text-center'>
          {contents.text1}
        </h2>
        <div className='flex flex-wrap justify-center items-center w-full md:gap-10'>
            {contents.features.map((feature, index) => (
              <div key={index} className='flex flex-col rounded-[40px] items-center justify-center gap-4 md:px-4 md:py-5 md:gap-5 md:w-[360px] md:h-[160px] bg-primary'>
                <h4 className='custom-display1 text-background text-center'>{feature.name}</h4>
                <h6 className='custom-text2 text-background text-center'>{feature.text}</h6>
              </div>
            ))}
        </div>
    </div>
  )
}

export default Features