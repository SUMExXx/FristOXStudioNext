import { contents } from '@/data/website'
import WallpaperIcon from '@mui/icons-material/Wallpaper';
import AnimationIcon from '@mui/icons-material/Animation';
import ViewInArIcon from '@mui/icons-material/ViewInAr';
import DrawIcon from '@mui/icons-material/Draw';
import React from 'react'

function UniqueFeatures() {
  return (
    <div className='w-full flex items-center justify-center md:px-32 md:py-10 md:gap-20'>
        <h2 className='custom-heading text-secondary text-center w-[400px]'>
          {contents.text2}
        </h2>
        <div className='flex flex-col justify-center items-center w-full md:gap-8'>
          <div className='flex w-full md:h-[100px] rounded-[40px] items-center justify-center md:px-20 md:py-5 md:gap-20 bg-primary text-[60px]'>
            <WallpaperIcon fontSize='inherit' className='w-[60px] h-[60px] text-[60px] text-foreground'/>
            <div className='w-full flex flex-col justify-center items-center md:gap-2'>
              <h4 className='custom-display1 text-white text-left w-full'>{contents.uniqueFeatures[0].name}</h4>
              <h6 className='custom-text2 text-white text-left w-full'>{contents.uniqueFeatures[0].text}</h6>
            </div>
          </div>
          <div className='flex w-full md:h-[100px] rounded-[40px] items-center justify-center md:px-20 md:py-5 md:gap-20 bg-primary text-[60px]'>
            <AnimationIcon fontSize='inherit' className='w-[60px] h-[60px] text-[60px] text-foreground'/>
            <div className='w-full flex flex-col justify-center items-center md:gap-2'>
              <h4 className='custom-display1 text-white text-left w-full'>{contents.uniqueFeatures[1].name}</h4>
              <h6 className='custom-text2 text-white text-left w-full'>{contents.uniqueFeatures[1].text}</h6>
            </div>
          </div>
          <div className='flex w-full md:h-[100px] rounded-[40px] items-center justify-center md:px-20 md:py-5 md:gap-20 bg-primary text-[60px]'>
            <ViewInArIcon fontSize='inherit' className='w-[60px] h-[60px] text-[60px] text-foreground'/>
            <div className='w-full flex flex-col justify-center items-center md:gap-2'>
              <h4 className='custom-display1 text-white text-left w-full'>{contents.uniqueFeatures[2].name}</h4>
              <h6 className='custom-text2 text-white text-left w-full'>{contents.uniqueFeatures[2].text}</h6>
            </div>
          </div>
          <div className='flex w-full md:h-[100px] rounded-[40px] items-center justify-center md:px-20 md:py-5 md:gap-20 bg-primary text-[60px]'>
            <DrawIcon fontSize='inherit' className='w-[60px] h-[60px] text-[60px] text-foreground'/>
            <div className='w-full flex flex-col justify-center items-center md:gap-2'>
              <h4 className='custom-display1 text-white text-left w-full'>{contents.uniqueFeatures[3].name}</h4>
              <h6 className='custom-text2 text-white text-left w-full'>{contents.uniqueFeatures[3].text}</h6>
            </div>
          </div>
        </div>
    </div>
  )
}

export default UniqueFeatures