'use client';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import React from 'react'

function QNAElement({question, answer}: QNAElementProps) {

  const [open, setOpen] = React.useState<boolean>(false)

  return (
    <div className='flex flex-col w-full rounded-[40px] max-h-[160px] bg-primary text-white text-[40px]'>
      <div className='z-10 flex w-full md:h-[120px] rounded-[40px] items-center justify-between md:px-20 md:py-5 md:gap-20 bg-primary text-[60px]'>
        <h4 className='custom-display1 text-white text-left w-full'>{question}</h4>
        <button className='flex items-center justify-center outline-none' onClick={() => setOpen(!open)}>
          <KeyboardArrowDownIcon fontSize='inherit' className={`w-[60px] h-[60px] text-[60px] text-foreground transition-all duration-300 ease-in-out ${open? 'rotate-0': 'rotate-180'}`}/>
        </button>
      </div>
      <div className='relative bottom-0 left-0 flex w-full md:h-[120px] rounded-[40px] items-center justify-between md:px-20 md:py-5 md:gap-20 bg-tertiary text-[60px]'>
        <h4 className='custom-display1 text-white text-left w-full'>{answer}</h4>
      </div>
    </div>
  )
}

export default QNAElement