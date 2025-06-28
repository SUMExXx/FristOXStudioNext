import React from 'react'
import { contents } from '@/lib/data/website'
import VerifiedOutlinedIcon from '@mui/icons-material/VerifiedOutlined';
import Link from 'next/link';
import NavbarStudio from '@/components/NavbarStudio';

const Upgrade = () => {

    return (
        <>
            <NavbarStudio style={null} upgrade={false} />
            <div className='mt-[60px] md:mt-[80px] md:min-h-[calc(100vh-80px)] h-full text-black'>
                <div className='w-full h-full flex flex-col items-center justify-start'>
                    <div className='w-full h-full flex flex-col items-center justify-start md:px-20 md:py-10 md:gap-10'>
                        <div className='flex flex-col justify-center items-center w-full md:gap-5'>
                            <h2 className='custom-heading text-foreground text-center'>{contents.text3}</h2>
                            <h2 className='custom-display2 text-foreground text-center whitespace-pre'>{contents.text4[0]+"          "+contents.text4[1]+"          "+contents.text4[2]}</h2>
                        </div>
                        <div className='flex flex-warp md:gap-5 justify-center items-center w-full md:px-10'>
                        {/* <div className='md:w-[340px] md:h-[300px] md:rounded-[30px] bg-foreground md:p-5 flex flex-col justify-between items-center md:gap-10'>
                            <h4 className='custom-text3 w-full text-left text-background'>{contents.text6}</h4>
                            <div className='w-full h-full flex flex-col justify-between items-start'>
                            <div className='w-full flex flex-col md:gap-[10px] justify-center items-start'>
                                {
                                contents.pricing[0].map((info, index) => (
                                    <div key={index} className='w-full flex flex-row justify-start items-center md:gap-[10px]'>
                                    <VerifiedOutlinedIcon fontSize='inherit' className='text-background text-[16px]'/>
                                    <h6 className='custom-text1 text-background'>{info}</h6>
                                    </div>
                                ))
                                }
                            </div>
                            <button type='button' className='w-full bg-background custom-display2 text-foreground rounded-[30px] md:px-10 md:py-[10px] md:gap-[10px]'>
                                {contents.text7}
                            </button>
                            </div>
                        </div> */}
                        <div className='flex flex-col px-[20px] bg-primary rounded-[40px]'>
                            <div className='w-full h-[40px] flex justify-center items-center md:p-[4px] md:gap-[10px]'>
                            <h3 className='custom-text3 text-background'>{contents.text5}</h3>
                            </div>
                            <div className='md:w-[340px] md:h-[300px] md:rounded-[30px] bg-foreground md:p-5 flex flex-col justify-between items-center md:gap-10'>
                            <h4 className='custom-text3 w-full text-left text-background'>{contents.text9}</h4>
                            <div className='w-full h-full flex flex-col justify-between items-start'>
                                <div className='w-full flex flex-col md:gap-[10px] justify-center items-start'>
                                {
                                    contents.pricing[0].map((info, index) => (
                                    <div key={index} className='w-full flex flex-row justify-start items-center md:gap-[10px]'>
                                        <VerifiedOutlinedIcon fontSize='inherit' className='text-background text-[16px]'/>
                                        <h6 className='custom-text1 text-background'>{info}</h6>
                                    </div>
                                    ))
                                }
                                </div>
                                <Link href={'/studio/upgrade/premium-checkout'} className='w-full bg-background custom-display2 text-foreground rounded-[30px] md:px-10 md:py-[10px] md:gap-[10px] hover:scale-105 transition-all duration-300 ease-in-out'>
                                    {contents.text8}
                                </Link>
                            </div>
                            </div>
                            <div className='w-full h-[40px] flex justify-center items-center md:p-[4px] md:gap-[10px]'/>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Upgrade