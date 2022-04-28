import '../styles/globals.css'
import Navbar from '@/components/Navbar/Navbar'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
function MyApp({ Component, pageProps }) {

  const router = useRouter()
  useEffect(() => {
    const bodybg = {
      '/': 'bg-grad-lblue',
      '/diary': 'bg-grad-lred',
      '/askme': 'bg-grad-lyellow',
      '/contact': 'bg-grad-leftblue'
    }
    document.body.className = bodybg[router.pathname]
  }, [router.pathname])

  return <>
    <Navbar />
    <div className='flex flex-col justify-center'>
    <Component {...pageProps} className="h-full" />
    </div>
    
  </>
}

export default MyApp
