import { contents } from '@/lib/data/website'
import ReferHome from "@/components/ReferHome";
import StatsPage from "@/components/StatsPage";
import Image from "next/image";
import Link from "next/link";
import WallpaperIcon from '@mui/icons-material/Wallpaper';
import AnimationIcon from '@mui/icons-material/Animation';
import ViewInArIcon from '@mui/icons-material/ViewInAr';
import DrawIcon from '@mui/icons-material/Draw';
import VerifiedOutlinedIcon from '@mui/icons-material/VerifiedOutlined';
import QNAElement from '@/components/QNAElement';

const models: string[] = [
  '/images/beanie.png',
  '/images/cap.png',
  '/images/oversized-tshirt.png',
  '/images/pant-animated.png',
  '/images/tshirt-animated.png',
  '/images/tshirt.png'
]

const models2D: string[] = [
  '/images/mockup-2d-1.png',
  '/images/mockup-2d-2.png',
  '/images/mockup-2d-4.png',
  '/images/mockup-2d-5.png',
  '/images/mockup-2d-6.png',
  '/images/mockup-2d-7.png',
]

export default function Home() {
  
  return (
    <div className="w-full h-full flex flex-col items-center justify-start">
      <main className="w-full flex flex-col items-center justify-start">
        
        <section className='w-full flex flex-col items-center justify-start md:px-20 md:py-10 '>
          <div className='bg-primary rounded-[40px] flex justify-center items-center md:h-[520px] w-full md:px-10 overflow-hidden relative'>
            <div className='flex flex-col w-full items-start justify-center gap-8 md:pr-10'>
              <h1 className='z-30 font-bold text-background custom-heading1 md:w-[900px] leading-[90px]'>{contents.mainTitle}</h1>
              <p className='z-30 custom-text2 md:w-[640px] text-background justify-start text-left'>{contents.mainSubtitle}</p>
              <Link href='/studio' className='md:px-10 md:py-5 rounded-full bg-background text-foreground custom-display1'>
                {contents.mainButton}
              </Link>
            </div>
            <video autoPlay loop muted playsInline className='absolute h-[600px] right-0 object-cover bg-transparent pointer-events-none overflow-hidden'>
              <source src="/videos/hero-vid.mp4" type="video/webm" />
              <img src="/videos/GIF-12.gif" alt="Fallback image" />
            </video>
          </div>
        </section>

        <section className='w-full flex flex-col items-center justify-start md:px-20 md:py-10 md:gap-10'>
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
        </section>

        <section className='w-full h-full flex flex-col items-center justify-start md:px-20 md:py-10 md:gap-10'>
          <div className='flex flex-col justify-start items-center w-full md:gap-10'>
            <h2 className='custom-heading text-foreground'>
              Convert your 2D Designs to 3D
            </h2>
            <div className='flex flex-wrap md:gap-10 justify-center items-start w-full'>
              {models.map((model, index) => (
                <div key={index} className='flex flex-col items-center justify-center gap-4 rounded-[40px] bg-primary md:w-[360px] md:h-[360px] overflow-hidden'>
                  <Image width={360} height={360} src={model} alt={"name"} draggable={false} className='object-cover w-full h-full pointer-events-none'/>
                  {/* <h3 className='text-2xl font-bold text-primary font-lily'>{model.name}</h3>
                  <p className='text-lg font-medium text-primary'>{model.name}</p> */}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className='w-full flex md:gap-20 justify-center max-w-[1600px] md:px-20 md:my-20'>
          <div className='w-full flex flex-col md:gap-10'>
            <video
              className="w-full h-[360px] rounded-[40px] overflow-hidden object-cover pointer-events-none"
              src="/videos/background-vid.mp4"
              autoPlay
              muted
              loop
              playsInline
              draggable={false}
            />
            <div className='flex w-full md:h-[100px] rounded-[40px] items-center justify-center md:px-20 md:py-5 md:gap-20 bg-primary text-[60px]'>
              <WallpaperIcon fontSize='inherit' className='w-[60px] h-[60px] text-[60px] text-background' />
              <div className='w-full flex flex-col justify-center items-center md:gap-2'>
                <h4 className='custom-display1 text-background text-left w-full'>{contents.uniqueFeatures[0].name}</h4>
                <h6 className='custom-text2 text-background text-left w-full'>{contents.uniqueFeatures[0].text}</h6>
              </div>
            </div>
          </div>
          <div className='w-full flex flex-col md:gap-10'>
            <video
              className="w-full h-[360px] rounded-[40px] overflow-hidden object-cover pointer-events-none"
              src="/videos/animation-vid.mp4"
              autoPlay
              muted
              loop
              playsInline
              draggable={false}
            />
            <div className='flex w-full md:h-[100px] rounded-[40px] items-center justify-center md:px-20 md:py-5 md:gap-20 bg-primary text-[60px]'>
              <AnimationIcon fontSize='inherit' className='w-[60px] h-[60px] text-[60px] text-background' />
              <div className='w-full flex flex-col justify-center items-center md:gap-2'>
                <h4 className='custom-display1 text-background text-left w-full'>{contents.uniqueFeatures[1].name}</h4>
                <h6 className='custom-text2 text-background text-left w-full'>{contents.uniqueFeatures[1].text}</h6>
              </div>
            </div>
          </div>  
        </section>

        <section className='w-full flex items-center justify-center md:px-20 md:py-10 md:gap-20'>
          <h2 className='custom-heading text-foreground text-center w-[400px]'>
            {contents.text2}
          </h2>
          <div className='flex flex-col justify-center items-center w-full md:gap-8'>
            <div className='flex w-full md:h-[100px] rounded-[40px] items-center justify-center md:px-20 md:py-5 md:gap-20 bg-primary text-[60px]'>
              <ViewInArIcon fontSize='inherit' className='w-[60px] h-[60px] text-[60px] text-background' />
              <div className='w-full flex flex-col justify-center items-center md:gap-2'>
                <h4 className='custom-display1 text-background text-left w-full'>{contents.uniqueFeatures[2].name}</h4>
                <h6 className='custom-text2 text-background text-left w-full'>{contents.uniqueFeatures[2].text}</h6>
              </div>
            </div>
            <div className='flex w-full md:h-[100px] rounded-[40px] items-center justify-center md:px-20 md:py-5 md:gap-20 bg-primary text-[60px]'>
              <DrawIcon fontSize='inherit' className='w-[60px] h-[60px] text-[60px] text-background' />
              <div className='w-full flex flex-col justify-center items-center md:gap-2'>
                <h4 className='custom-display1 text-background text-left w-full'>{contents.uniqueFeatures[3].name}</h4>
                <h6 className='custom-text2 text-background text-left w-full'>{contents.uniqueFeatures[3].text}</h6>
              </div>
            </div>
          </div>
        </section>

        <section className='w-full flex flex-col items-center justify-start md:py-10 md:gap-20'>
          <div className='w-full flex flex-col items-center justify-start md:py-10 md:px-32 md:gap-10 bg-primary'>
            <h2 className='custom-heading text-background text-center'>
              Built for Creators who refuse to blend in
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
        </section>

        <section className='w-full h-full flex flex-col items-center justify-start md:px-20 md:py-10 md:gap-10'>
          <div className='flex flex-col justify-start items-center w-full md:gap-10'>
            <h2 className='custom-heading text-foreground'>
              2D Mockups
            </h2>
            <div className='flex flex-wrap md:gap-10 justify-center items-start w-full'>
              {models2D.map((model, index) => (
                <div key={index} className='flex flex-col items-center justify-center gap-4 rounded-[40px] bg-primary md:w-[360px] md:h-[360px] overflow-hidden'>
                  <Image width={360} height={360} src={model} alt={"name"} draggable={false} className='object-cover w-full h-full pointer-events-none' />
                  {/* <h3 className='text-2xl font-bold text-primary font-lily'>{model.name}</h3>
                  <p className='text-lg font-medium text-primary'>{model.name}</p> */}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className='w-full flex md:gap-20 justify-center max-w-[1600px] md:px-20 md:my-20'>
          <div className='w-full flex flex-col md:gap-10'>
            <video
              className="w-full h-[360px] rounded-[40px] overflow-hidden object-cover pointer-events-none"
              src="/videos/back-2d.mp4"
              autoPlay
              muted
              loop
              playsInline
              draggable={false}
            />
            <div className='flex w-full md:h-[100px] rounded-[40px] items-center justify-center md:px-20 md:py-5 md:gap-20 bg-primary text-[60px]'>
              <WallpaperIcon fontSize='inherit' className='w-[60px] h-[60px] text-[60px] text-background' />
              <div className='w-full flex flex-col justify-center items-center md:gap-2'>
                <h4 className='custom-display1 text-background text-left w-full'>{contents.uniqueFeatures[0].name}</h4>
                <h6 className='custom-text2 text-background text-left w-full'>{contents.uniqueFeatures[0].text}</h6>
              </div>
            </div>
          </div>
          <div className='w-full flex flex-col md:gap-10'>
            <video
              className="w-full h-[360px] rounded-[40px] overflow-hidden object-cover pointer-events-none"
              src="/videos/back-text.mp4"
              autoPlay
              muted
              loop
              playsInline
              draggable={false}
            />
            <div className='flex w-full md:h-[100px] rounded-[40px] items-center justify-center md:px-20 md:py-5 md:gap-20 bg-primary text-[60px]'>
              <AnimationIcon fontSize='inherit' className='w-[60px] h-[60px] text-[60px] text-background' />
              <div className='w-full flex flex-col justify-center items-center md:gap-2'>
                <h4 className='custom-display1 text-background text-left w-full'>{contents.uniqueFeatures[1].name}</h4>
                <h6 className='custom-text2 text-background text-left w-full'>{contents.uniqueFeatures[1].text}</h6>
              </div>
            </div>
          </div>
        </section>

        <Link href={'/studio'} className='md:px-40 md:py-5 rounded-full bg-main-foreground text-main-background md:my-20 hover:scale-110 transition-all duration-300 ease-in-out'>Get Started</Link>

        <section className='w-full h-full flex flex-col items-center justify-start md:px-20 md:py-10 md:gap-20'>
          <div className='flex flex-col justify-center items-center w-full md:gap-10'>
            <h2 className='custom-heading text-foreground text-center'>{contents.text3}</h2>
            <h2 className='custom-display2 text-foreground text-center whitespace-pre'>{contents.text4[0] + "          " + contents.text4[1] + "          " + contents.text4[2]}</h2>
          </div>
          <div className='flex flex-warp md:gap-5 justify-center items-center w-full md:px-10'>
            {/* <div className='md:w-[340px] md:h-[300px] md:rounded-[30px] bg-foreground md:p-5 flex flex-col justify-between items-center md:gap-10'>
              <h4 className='custom-text3 w-full text-left text-background'>{contents.text6}</h4>
              <div className='w-full h-full flex flex-col justify-between items-start'>
                <div className='w-full flex flex-col md:gap-[10px] justify-center items-start'>
                  {
                    contents.pricing[0].map((info, index) => (
                      <div key={index} className='w-full flex flex-row justify-start items-center md:gap-[10px]'>
                        <VerifiedOutlinedIcon fontSize='inherit' className='text-background text-[16px]' />
                        <h6 className='custom-text1 text-background'>{info}</h6>
                      </div>
                    ))
                  }
                </div>
                <button className='w-full bg-background custom-display2 text-foreground rounded-[30px] md:px-10 md:py-[10px] md:gap-[10px]'>
                  {contents.text7}
                </button>
              </div>
            </div> */}
            <div className='flex flex-col px-[20px] bg-primary rounded-[40px]'>
              <div className='w-full h-[40px] flex justify-center items-center md:p-[4px] md:gap-[10px]'>
                <h3 className='custom-text3 text-background'>{contents.text5}</h3>
              </div>
              <div className='md:w-[340px] md:h-[300px] md:rounded-[30px] bg-foreground md:p-5 flex flex-col justify-between items-center md:gap-10'>
                <h4 className='custom-text3 w-full text-left text-background'>Go Pro $26/month</h4>
                <div className='w-full h-full flex flex-col justify-between items-start'>
                  <div className='w-full flex flex-col md:gap-[10px] justify-center items-start'>
                    {
                      contents.pricing[0].map((info, index) => (
                        <div key={index} className='w-full flex flex-row justify-start items-center md:gap-[10px]'>
                          <VerifiedOutlinedIcon fontSize='inherit' className='text-background text-[16px]' />
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
              <div className='w-full h-[40px] flex justify-center items-center md:p-[4px] md:gap-[10px]' />
            </div>
          </div>
        </section>

        <section className='w-full h-full flex flex-col items-center justify-start md:px-20 md:py-10 md:gap-20'>
          <div className='flex flex-col justify-start items-center w-full md:gap-20'>
            <h2 className='custom-heading text-foreground'>
              {contents.text10}
            </h2>
            <div className='flex flex-col flex-wrap md:gap-10 justify-center items-start w-full'>
              {contents.qna.map((qa, index) => (
                <QNAElement key={index} question={qa.question} answer={qa.answer} />
              ))}
            </div>
          </div>
        </section>

        <StatsPage/>
        <ReferHome/>
      </main>
    </div>
  );
}
