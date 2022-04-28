import '../styles/globals.css'
import Navbar from '@/components/Navbar/Navbar'
import { useRouter, Router } from 'next/router'
import { useEffect } from 'react'
import NProgress from 'nprogress'; 
import 'nprogress/nprogress.css'; 

Router.events.on('routeChangeStart', () => NProgress.start()); Router.events.on('routeChangeComplete', () => NProgress.done()); Router.events.on('routeChangeError', () => NProgress.done());


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
