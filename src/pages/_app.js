import '../styles/globals.css'
import Navbar from '@/components/navbar/Navbar'
import { useRouter, Router } from 'next/router'
import { useEffect } from 'react'
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import Head from 'next/head'
import { SessionProvider } from 'next-auth/react'

NProgress.configure({ showSpinner: false });
Router.events.on('routeChangeStart', () => NProgress.start()); Router.events.on('routeChangeComplete', () => NProgress.done()); Router.events.on('routeChangeError', () => NProgress.done());


function MyApp({ Component, pageProps: { session, ...pageProps } }) {

  const router = useRouter()

  const document_title = {
    '/': "Lurifos - Programmer",
    '/diary': 'Diary',
    '/askme': 'Ask Me',
    '/contact': 'Contact'
  }

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
    <Head>
      <title>{document_title[router.pathname]}</title>
      <meta name="description" content="Hello there, I am Lurifos and welcome to my playground. I'm a computer science student who love math." />
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <SessionProvider session={session}>
      <Navbar />
      <div className='flex flex-col justify-center max-w-full'>

        <Component {...pageProps} className="" />
      </div>
    </SessionProvider>

  </>
}

export default MyApp
