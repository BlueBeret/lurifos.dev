
import { PrismaClient } from '@prisma/client'
import ReactMarkdown from 'react-markdown'
import Head from 'next/head'
import gfm from 'remark-gfm'
import styles from './markdown.module.css'
import toast, { Toaster } from 'react-hot-toast'


const Diary = (props) => {
  const diary = props.data.length > 0 ? props.data[0] : {
    uuid: 'h3llo-world',
    title: 'Oh no!',
    body: `No diary found! Are you lost?  
    Let's get back to [diary](/diary)  
    If you think this is an error, please let [me](/contact) know.`,
    timecreated: 'December 16, 1991',
    lastedited: 'December 16, 1991',
  }

  const copyuuid = () => {
    navigator.clipboard.writeText(diary.uuid)
    toast('uuid copied to clipboard!', {
      duration: 4000,
      position: 'top-right',
      type: 'success',
    })
  }

  const parseDate = (date) => {
    function formatAMPM(date) {
      var hours = date.getHours();
      var minutes = date.getMinutes();
      var ampm = hours >= 12 ? 'pm' : 'am';
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      minutes = minutes < 10 ? '0' + minutes : minutes;
      var strTime = hours + ':' + minutes + ' ' + ampm;
      return strTime;
    }



    const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    const dateObj = new Date(date)
    return `${month[dateObj.getMonth()] + ' ' + dateObj.getDate() + ', ' + dateObj.getFullYear() + ' at ' + formatAMPM(dateObj)}`
  }

  return <div className='content-container items-start max-w-[1080px]'>
    <Head>
      <title>{diary.title}</title>
    </Head>
    <div className='post-header flex flex-col items-start mb-5'>
      <h1>{diary.title}</h1>
      <div className='flex flex-col text-grey'>
        <span>{parseDate(diary.timecreated)}</span>
      </div>
    </div>


    <div className={styles.body}>
      <ReactMarkdown remarkPlugins={[gfm]}
      >{diary.body}</ReactMarkdown>
    </div>
    <div className='flex flex-col'>
      <span className='text-grey mt-1'>LastEdit: {parseDate(diary.lastedited)}</span>
      <span title="click to copy" className='text-grey hover:cursor-pointer' onClick={(e) => copyuuid()}>{diary.uuid}</span>
    </div>
    <Toaster />
  </div>
}

export async function getServerSideProps(context) {
  const { uuid } = context.query
  try {
    const prisma = new PrismaClient()
    const data = await prisma.$queryRaw`SELECT * FROM diary WHERE uuid = ${uuid}`
    prisma.$disconnect()

    data.map(x => {
      x.timecreated = x.timecreated.toString()
      x.lastedited = x.lastedited.toString()
      return x
    })
    return { props: { data } }
  } catch (error) {
    console.log(error)
    return { props: { data: [] } }
  }


}

export default Diary