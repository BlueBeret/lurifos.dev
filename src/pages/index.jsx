
import { useEffect } from 'react';
import Image from 'next/image';

export default function Home() {
  useEffect(() => { document.querySelector("body").classList.add("bg-grad-lblue") }, []);
  return (
    <div className=''>

      <div className='content px-10 pt-6 lg:mt-10 flex flex-col md:flex-row md:px-20 lg:px-36 items-center md:justify-between'>
        <div className='shortdesc flex flex-col md:max-w-[50%] animate-fade-in-right gap-4'>
          <h1 className='text-[25px] font-semibold md:text-[40px] lg:text-[56px] md:font-bold'>
            Lurifos  <div className='inline items-center text-grey text-[10px]'> a.k.a </div> <br className='hidden md:flex' />Blueberet
          </h1>

          <p className='break-normal'>
            Hello, I am Lurifos and welcome to my playground. I&apos;m a computer science student who love math. Mostly I do frontend and backend project but sometimes I do other project too, like discord bot, twitter app, and more.
          </p>
        </div>
        <Image src="/images/sitlaptop.png" className="w-0 lg:w-1/2 animate-fade-in-left" width={632} height={534} alt="man sitting with laptop" />
      </div>
    </div>
  )
}
