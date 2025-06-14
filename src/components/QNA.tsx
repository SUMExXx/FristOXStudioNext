import { contents } from '@/lib/data/website'
import React from 'react'
import QNAElement from './QNAElement'

function QNA() {

  return (
    <div className='w-full h-full flex flex-col items-center justify-start md:px-20 md:py-10 md:gap-20'>
        <div className='flex flex-col justify-start items-center w-full md:gap-20'>
          <h2 className='custom-heading text-foreground'>
            {contents.text10}
          </h2>
          <div className='flex flex-col flex-wrap md:gap-10 justify-center items-start w-full'>
            {contents.qna.map((qa, index) => (
              <QNAElement key={index} question={qa.question} answer={qa.answer}/>
            ))}
          </div>
        </div>
    </div>
  )
}

export default QNA